
import { useState, useCallback, useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, createProfileManually } from "@/utils/profile/profile-api";
import { logProfile } from "@/utils/profile/profile-logger";

// Constants to configure behavior
const MAX_RETRY_COUNT = 2;
const RETRY_DELAY_BASE = 1000; // 1 second
const MIN_FETCH_INTERVAL = 1000; // 1 second minimum between fetches

export const useProfileManagement = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const lastFetchTime = useRef<number>(0);
  const isCreatingProfile = useRef<boolean>(false);
  const fetchInProgress = useRef<boolean>(false);
  const retryTimeoutId = useRef<number | null>(null);
  
  // Clear any existing retry timeout when component unmounts
  useEffect(() => {
    return () => {
      if (retryTimeoutId.current !== null) {
        clearTimeout(retryTimeoutId.current);
      }
    };
  }, []);

  // Calculate delay for retry attempts using exponential backoff
  const getBackoffDelay = (retryCount: number): number => {
    return RETRY_DELAY_BASE * Math.pow(2, retryCount) * (1 + Math.random() * 0.1);
  };

  // Apply rate limiting to prevent too many requests
  const shouldThrottleFetch = (): boolean => {
    const now = Date.now();
    if (now - lastFetchTime.current < MIN_FETCH_INTERVAL) {
      logProfile("Throttling profile fetch - too many requests", null, true);
      return true;
    }
    lastFetchTime.current = now;
    return false;
  };

  // Fetch profile function with improved retry logic and rate limiting
  const fetchProfileAndSetState = useCallback(async (userId: string, retryCount = 0) => {
    if (!userId) {
      logProfile("No userId provided to fetchProfileAndSetState", null, true);
      return null;
    }
    
    // Prevent concurrent fetches for the same user
    if (fetchInProgress.current) {
      logProfile("Profile fetch already in progress", null, true);
      return null;
    }
    
    // Apply rate limiting
    if (shouldThrottleFetch()) {
      return null;
    }
    
    fetchInProgress.current = true;
    setProfileLoading(true);
    
    try {
      logProfile(`Fetching profile for user: ${userId} (attempt ${retryCount + 1})`);
      const profileData = await fetchProfile(userId);
      
      if (!profileData) {
        logProfile(`No profile found for user: ${userId} on attempt ${retryCount + 1}`, null, true);
        
        // Implement limited retries (max 2)
        if (retryCount < MAX_RETRY_COUNT) {
          // Use exponential backoff for retries
          const delay = getBackoffDelay(retryCount);
          logProfile(`Retrying profile fetch in ${delay}ms...`, null, true);
          
          // Clear any existing timeout
          if (retryTimeoutId.current !== null) {
            clearTimeout(retryTimeoutId.current);
          }
          
          // Set new timeout
          retryTimeoutId.current = window.setTimeout(() => {
            fetchInProgress.current = false;
            if (userId) { // Double check userId is still valid
              fetchProfileAndSetState(userId, retryCount + 1);
            }
          }, delay) as unknown as number;
          
          return null;
        } else if (retryCount === MAX_RETRY_COUNT && !isCreatingProfile.current) {
          // After final retry - attempt to auto-create profile
          return await attemptProfileCreation(userId);
        }
      } else {
        logProfile("Profile data retrieved successfully:", profileData);
        setProfile(profileData);
        setProfileError(null);
        setProfileLoading(false);
        fetchInProgress.current = false;
        return profileData;
      }
    } catch (err) {
      logProfile("Error fetching profile:", err, false, true);
      
      if (retryCount < MAX_RETRY_COUNT) {
        // Use exponential backoff for retries
        const delay = getBackoffDelay(retryCount);
        logProfile(`Error occurred, retrying profile fetch in ${delay}ms...`, null, true);
        
        // Clear any existing timeout
        if (retryTimeoutId.current !== null) {
          clearTimeout(retryTimeoutId.current);
        }
        
        // Set new timeout
        retryTimeoutId.current = window.setTimeout(() => {
          fetchInProgress.current = false;
          if (userId) { // Double check userId is still valid
            fetchProfileAndSetState(userId, retryCount + 1);
          }
        }, delay) as unknown as number;
        
        return null;
      } else {
        // After final retry - set loading to false even with errors
        setProfileError("Error loading profile data");
        setProfileLoading(false);
        fetchInProgress.current = false;
        
        // Show recoverable error to user
        toast.error("Profile loading failed. Please try refreshing the page.");
        return null;
      }
    }
    
    setProfileLoading(false);
    fetchInProgress.current = false;
    return null;
  }, []);

  // Attempt to create a profile automatically after fetch failures
  const attemptProfileCreation = async (userId: string): Promise<Profile | null> => {
    isCreatingProfile.current = true;
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
          isCreatingProfile.current = false;
          fetchInProgress.current = false;
          return createdProfile;
        }
      }
    } catch (autoCreateError) {
      logProfile("Failed to auto-create profile:", autoCreateError, false, true);
    }
    
    // If auto-creation failed
    setProfileLoading(false);
    setProfileError("Unable to load or create user profile");
    isCreatingProfile.current = false;
    fetchInProgress.current = false;
    return null;
  };

  // Function to manually create a profile
  const ensureProfile = async (user: User | null): Promise<Profile | null> => {
    if (!user) {
      logProfile("No user provided to ensureProfile", null, true);
      return null;
    }
    
    if (profile) return profile;
    
    // Prevent multiple simultaneous creation attempts
    if (isCreatingProfile.current) {
      logProfile("Profile creation already in progress", null, true);
      return null;
    }
    
    // Apply rate limiting
    if (shouldThrottleFetch()) {
      return null;
    }
    
    isCreatingProfile.current = true;
    setProfileLoading(true);
    
    try {
      logProfile(`Manual profile creation initiated for user: ${user.id}`, { email: user.email });
      
      const newProfile = await createProfileManually(
        user.id, 
        user.email || '', 
        user.user_metadata?.first_name || '',
        user.user_metadata?.last_name || '',
        user.user_metadata?.role || 'founder'
      );
      
      if (newProfile) {
        setProfile(newProfile);
        setProfileError(null);
        toast.success("Profile created successfully");
        setProfileLoading(false);
        isCreatingProfile.current = false;
        return newProfile;
      }
      
      setProfileError("Failed to create user profile");
      toast.error("Could not create your profile. Please try again.");
      setProfileLoading(false);
      isCreatingProfile.current = false;
      return null;
    } catch (error) {
      logProfile("Failed to ensure profile exists:", error, false, true);
      setProfileError("Error creating user profile");
      toast.error("Error creating your profile. Please try again.");
      setProfileLoading(false);
      isCreatingProfile.current = false;
      return null;
    }
  };

  const resetProfileState = useCallback(() => {
    if (retryTimeoutId.current !== null) {
      clearTimeout(retryTimeoutId.current);
      retryTimeoutId.current = null;
    }
    setProfile(null);
    setProfileLoading(false);
    setProfileError(null);
    lastFetchTime.current = 0;
    isCreatingProfile.current = false;
    fetchInProgress.current = false;
  }, []);

  return {
    profile,
    profileLoading,
    profileError,
    fetchProfileAndSetState,
    ensureProfile,
    resetProfileState,
    setProfile,
    isCreatingProfile: isCreatingProfile.current
  };
};
