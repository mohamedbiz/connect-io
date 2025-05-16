
import { useState, useCallback, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, createProfileManually } from "@/utils/profile/profile-api";
import { getBackoffDelay, applyRateLimiting } from "@/utils/profile/profile-retry";
import { logProfile } from "@/utils/profile/profile-logger";

export const useProfileManagement = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileAttempts, setProfileAttempts] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [retryTimeoutId, setRetryTimeoutId] = useState<number | null>(null);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);

  // Clear any existing retry timeout when component unmounts or before setting new ones
  const clearRetryTimeout = useCallback(() => {
    if (retryTimeoutId !== null) {
      clearTimeout(retryTimeoutId);
      setRetryTimeoutId(null);
    }
  }, [retryTimeoutId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearRetryTimeout();
  }, [clearRetryTimeout]);

  // Fetch profile function with improved retry logic and rate limiting
  const fetchProfileAndSetState = useCallback(async (userId: string, retryCount = 0) => {
    if (!userId) return;
    
    // Apply rate limiting to prevent too many requests
    await applyRateLimiting(lastFetchTime);
    
    setLastFetchTime(Date.now());
    setProfileLoading(true);
    setProfileAttempts(prev => prev + 1);
    
    try {
      logProfile(`Fetching profile for user: ${userId} (attempt ${retryCount + 1})`);
      const profileData = await fetchProfile(userId);
      
      if (!profileData) {
        logProfile(`No profile found for user: ${userId} on attempt ${retryCount + 1}`, null, true);
        
        // Implement limited retries (max 3)
        if (retryCount < 2) {
          // Use exponential backoff for retries
          const delay = getBackoffDelay(retryCount);
          logProfile(`Retrying profile fetch in ${delay}ms...`, null, true);
          
          // Clear any existing timeout
          clearRetryTimeout();
          
          // Set new timeout
          const timeoutId = window.setTimeout(() => {
            if (userId) { // Double check userId is still valid
              fetchProfileAndSetState(userId, retryCount + 1);
            }
          }, delay) as unknown as number;
          
          setRetryTimeoutId(timeoutId);
          return;
        } else if (retryCount === 2 && !isCreatingProfile) {
          // After final retry - attempt to auto-create profile
          setIsCreatingProfile(true);
          logProfile("Attempting to auto-create profile after fetch failures", null, true);
          
          try {
            // Fetch the current user to ensure we have the latest data
            const { data: { user } } = await supabase.auth.getUser();
            if (user && user.id === userId) {
              const createdProfile = await createProfileManually(
                user.id,
                user.email || '',
                user.user_metadata?.first_name || '',
                user.user_metadata?.last_name || '',
                user.user_metadata?.role || 'founder'
              );
              
              if (createdProfile) {
                setProfile(createdProfile);
                setProfileError(null);
                logProfile("Auto-created profile successfully", createdProfile);
                toast.success("Profile created automatically");
                setProfileLoading(false);
                setIsCreatingProfile(false);
                return;
              }
            }
            setIsCreatingProfile(false);
          } catch (autoCreateError) {
            logProfile("Failed to auto-create profile:", autoCreateError, false, true);
            setIsCreatingProfile(false);
          }
          
          // If we get here, both fetch and auto-create failed
          setProfileLoading(false);
          setProfileError("Unable to load user profile");
        }
      } else {
        logProfile("Profile data retrieved successfully:", profileData);
        setProfile(profileData);
        setProfileError(null);
        setProfileLoading(false);
      }
    } catch (err) {
      logProfile("Error fetching profile:", err, false, true);
      
      if (retryCount < 2) {
        // Use exponential backoff for retries
        const delay = getBackoffDelay(retryCount);
        logProfile(`Error occurred, retrying profile fetch in ${delay}ms...`, null, true);
        
        // Clear any existing timeout
        clearRetryTimeout();
        
        // Set new timeout
        const timeoutId = window.setTimeout(() => {
          if (userId) { // Double check userId is still valid
            fetchProfileAndSetState(userId, retryCount + 1);
          }
        }, delay) as unknown as number;
        
        setRetryTimeoutId(timeoutId);
        return;
      } else {
        // After final retry - set loading to false even with errors
        setProfileLoading(false);
        setProfileError("Error loading profile data");
        
        // Show recoverable error to user
        toast.error("Profile loading failed. Please try refreshing the page or contact support if the issue persists.");
      }
    }
  }, [lastFetchTime, clearRetryTimeout, isCreatingProfile]);

  // Function to manually attempt creating a profile with improved rate limiting
  const ensureProfile = async (user: User | null): Promise<Profile | null> => {
    if (!user) return null;
    
    if (profile) return profile;
    
    // Prevent multiple simultaneous creation attempts
    if (isCreatingProfile) {
      logProfile("Profile creation already in progress", null, true);
      return null;
    }
    
    setIsCreatingProfile(true);
    
    // Apply rate limiting for profile creation attempts
    await applyRateLimiting(lastFetchTime, 1000);
    
    setLastFetchTime(Date.now());
    
    // Try to create profile manually if we have user but no profile
    try {
      setProfileLoading(true);
      logProfile(`Manual profile creation initiated for user: ${user.id}`, { email: user.email });
      
      const newProfile = await createProfileManually(
        user.id, 
        user.email || '', 
        user.user_metadata?.first_name || '',
        user.user_metadata?.last_name || '',
        user.user_metadata?.role || 'founder'
      );
      
      setProfileLoading(false);
      setIsCreatingProfile(false);
      
      if (newProfile) {
        setProfile(newProfile);
        setProfileError(null);
        toast.success("Profile created successfully");
        return newProfile;
      }
      
      setProfileError("Failed to create user profile");
      toast.error("Could not create your profile. Please try again or contact support.");
      return null;
    } catch (error) {
      logProfile("Failed to ensure profile exists:", error, false, true);
      setProfileLoading(false);
      setIsCreatingProfile(false);
      setProfileError("Error creating user profile");
      toast.error("Error creating your profile. Please try again.");
      return null;
    }
  };

  const resetProfileState = useCallback(() => {
    clearRetryTimeout();
    setProfile(null);
    setProfileLoading(false);
    setProfileError(null);
    setProfileAttempts(0);
    setLastFetchTime(0);
    setIsCreatingProfile(false);
  }, [clearRetryTimeout]);

  return {
    profile,
    profileLoading,
    profileError,
    profileAttempts,
    fetchProfileAndSetState,
    ensureProfile,
    resetProfileState,
    setProfile,
    isCreatingProfile
  };
};
