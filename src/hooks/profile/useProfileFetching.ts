
import { useState, useCallback, useRef } from "react";
import { Profile } from "@/types/auth";
import { fetchProfile } from "@/utils/profile/profile-api";
import { logProfile } from "@/utils/profile/profile-logger";
import { toast } from "sonner";
import { 
  getBackoffDelay,
  shouldThrottleFetch, 
  logProfileFetchAttempt,
  logProfileNotFound
} from "@/utils/profile/profileFetching";
import { createUserProfile } from "@/utils/profile/profileCreation";

export const useProfileFetching = () => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const lastFetchTime = useRef<number>(0);
  const fetchInProgress = useRef<boolean>(false);
  const retryTimeoutId = useRef<number | null>(null);

  const clearRetryTimeout = useCallback(() => {
    if (retryTimeoutId.current !== null) {
      clearTimeout(retryTimeoutId.current);
      retryTimeoutId.current = null;
    }
  }, []);

  // Fetch profile function with improved retry logic and rate limiting
  const fetchProfileAndSetState = useCallback(async (
    userId: string, 
    setProfile: (profile: Profile | null) => void,
    retryCount = 0
  ) => {
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
    if (shouldThrottleFetch(lastFetchTime.current)) {
      return null;
    }
    
    lastFetchTime.current = Date.now();
    fetchInProgress.current = true;
    setProfileLoading(true);
    
    try {
      logProfileFetchAttempt(userId, retryCount);
      const profileData = await fetchProfile(userId);
      
      if (!profileData) {
        logProfileNotFound(userId, retryCount);
        
        // Implement limited retries (max 2)
        if (retryCount < 2) {
          // Use exponential backoff for retries
          const delay = getBackoffDelay(retryCount);
          logProfile(`Retrying profile fetch in ${delay}ms...`, null, true);
          
          // Clear any existing timeout
          clearRetryTimeout();
          
          // Set new timeout
          retryTimeoutId.current = window.setTimeout(() => {
            fetchInProgress.current = false;
            if (userId) { // Double check userId is still valid
              fetchProfileAndSetState(userId, setProfile, retryCount + 1);
            }
          }, delay) as unknown as number;
          
          return null;
        } else if (retryCount === 2) {
          // After final retry - attempt to auto-create profile
          return await createUserProfile(userId, setProfile, setProfileError, setProfileLoading);
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
      
      if (retryCount < 2) {
        // Use exponential backoff for retries
        const delay = getBackoffDelay(retryCount);
        logProfile(`Error occurred, retrying profile fetch in ${delay}ms...`, null, true);
        
        // Clear any existing timeout
        clearRetryTimeout();
        
        // Set new timeout
        retryTimeoutId.current = window.setTimeout(() => {
          fetchInProgress.current = false;
          if (userId) { // Double check userId is still valid
            fetchProfileAndSetState(userId, setProfile, retryCount + 1);
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
  }, [clearRetryTimeout]);

  return {
    profileLoading,
    profileError,
    fetchProfileAndSetState,
    lastFetchTime: lastFetchTime.current,
    clearRetryTimeout,
    setProfileLoading,
    setProfileError,
    fetchInProgress: fetchInProgress.current
  };
};
