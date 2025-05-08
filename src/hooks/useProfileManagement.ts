
import { useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { fetchProfile, createProfileManually } from "@/utils/auth-utils";
import { Profile } from "@/types/auth";
import { toast } from "sonner";

// Helper for exponential backoff
const getBackoffDelay = (attempt: number, baseDelay = 800): number => {
  return Math.min(baseDelay * Math.pow(1.5, attempt), 5000); // Cap at 5 seconds
};

export const useProfileManagement = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileAttempts, setProfileAttempts] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  // Fetch profile function with limited retries and rate limiting
  const fetchProfileAndSetState = useCallback(async (userId: string, retryCount = 0) => {
    if (!userId) return;
    
    // Add rate limiting to prevent too many requests
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime;
    
    if (timeSinceLastFetch < 500 && retryCount > 0) {
      const waitTime = 500 - timeSinceLastFetch;
      console.log(`Rate limiting: waiting ${waitTime}ms before next profile fetch`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    setLastFetchTime(Date.now());
    setProfileLoading(true);
    setProfileAttempts(prev => prev + 1);
    
    try {
      console.log(`Fetching profile for user: ${userId} (attempt ${retryCount + 1})`);
      const profileData = await fetchProfile(userId);
      
      if (!profileData) {
        console.warn(`No profile found for user: ${userId} on attempt ${retryCount + 1}`);
        
        // Implement limited retries (max 2)
        if (retryCount < 2) {
          // Use exponential backoff for retries
          const delay = getBackoffDelay(retryCount);
          console.log(`Retrying profile fetch in ${delay}ms...`);
          
          setTimeout(() => {
            if (userId) { // Double check userId is still valid
              fetchProfileAndSetState(userId, retryCount + 1);
            }
          }, delay);
          return;
        } else {
          // After final retry - set loading to false even if profile is null
          setProfileLoading(false);
          setProfileError("Unable to load user profile. Please try refreshing the page.");
        }
      } else {
        console.log("Profile data retrieved successfully:", profileData);
        setProfile(profileData);
        setProfileError(null);
        setProfileLoading(false);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      
      if (retryCount < 2) {
        // Use exponential backoff for retries
        const delay = getBackoffDelay(retryCount);
        console.log(`Error occurred, retrying profile fetch in ${delay}ms...`);
        
        setTimeout(() => {
          if (userId) { // Double check userId is still valid
            fetchProfileAndSetState(userId, retryCount + 1);
          }
        }, delay);
        return;
      } else {
        // After final retry - set loading to false even with errors
        setProfileLoading(false);
        setProfileError("Error loading profile data. Please try refreshing the page.");
      }
    }
  }, [lastFetchTime]);

  // Function to manually attempt creating a profile with rate limiting
  const ensureProfile = async (user: User | null): Promise<Profile | null> => {
    if (!user) return null;
    
    if (profile) return profile;
    
    // Add rate limiting for profile creation attempts
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime;
    
    if (timeSinceLastFetch < 800) {
      const waitTime = 800 - timeSinceLastFetch;
      console.log(`Rate limiting: waiting ${waitTime}ms before profile creation attempt`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    setLastFetchTime(Date.now());
    
    // Try to create profile manually if we have user but no profile
    try {
      setProfileLoading(true);
      const newProfile = await createProfileManually(
        user.id, 
        user.email || '', 
        user.user_metadata?.first_name || '',
        user.user_metadata?.last_name || '',
        user.user_metadata?.role || 'founder'
      );
      
      setProfileLoading(false);
      if (newProfile) {
        setProfile(newProfile);
        setProfileError(null);
        return newProfile;
      }
      
      setProfileError("Failed to create user profile");
      return null;
    } catch (error) {
      console.error("Failed to ensure profile exists:", error);
      setProfileLoading(false);
      setProfileError("Error creating user profile");
      return null;
    }
  };

  const resetProfileState = () => {
    setProfile(null);
    setProfileLoading(false);
    setProfileError(null);
    setProfileAttempts(0);
    setLastFetchTime(0);
  };

  return {
    profile,
    profileLoading,
    profileError,
    profileAttempts,
    fetchProfileAndSetState,
    ensureProfile,
    resetProfileState,
    setProfile
  };
};
