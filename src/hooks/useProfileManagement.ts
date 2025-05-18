
import { useState, useCallback, useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";
import { useProfileFetching } from "./profile/useProfileFetching";
import { ensureUserProfileExists } from "@/utils/profile/profileCreation";
import { logProfile } from "@/utils/profile/profile-logger";

export const useProfileManagement = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const isCreatingProfile = useRef<boolean>(false);
  const initializeAttempted = useRef<boolean>(false);
  
  const {
    profileLoading,
    profileError,
    fetchProfileAndSetState,
    clearRetryTimeout,
    setProfileLoading,
    setProfileError,
    lastFetchTime
  } = useProfileFetching();

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      clearRetryTimeout();
    };
  }, [clearRetryTimeout]);

  // Wrapper for fetchProfileAndSetState to handle profile state
  const fetchProfileWrapper = useCallback((userId: string) => {
    if (!userId) {
      logProfile("Cannot fetch profile - invalid userId", null, true);
      return Promise.resolve(null);
    }
    
    logProfile(`Fetching profile for user: ${userId}`, null);
    initializeAttempted.current = true;
    return fetchProfileAndSetState(userId, setProfile);
  }, [fetchProfileAndSetState]);

  // Function to manually create a profile
  const ensureProfile = useCallback(async (user: User | null): Promise<Profile | null> => {
    if (isCreatingProfile.current) {
      logProfile("Profile creation already in progress", null, true);
      return null;
    }
    
    if (!user) {
      logProfile("No user provided to ensureProfile", null, true);
      return null;
    }
    
    isCreatingProfile.current = true;
    try {
      logProfile(`Ensuring profile exists for user: ${user.id}`, null);
      const result = await ensureUserProfileExists(
        user, 
        profile, 
        lastFetchTime,
        setProfileLoading,
        setProfile,
        setProfileError
      );
      
      if (result) {
        logProfile("Profile ensured successfully", { userId: user.id });
      } else {
        logProfile("Failed to ensure profile exists", { userId: user.id }, true);
      }
      
      return result;
    } catch (error) {
      logProfile("Error ensuring profile exists:", error, false, true);
      return null;
    } finally {
      isCreatingProfile.current = false;
    }
  }, [profile, lastFetchTime, setProfileLoading, setProfileError]);

  const resetProfileState = useCallback(() => {
    logProfile("Resetting profile state", null);
    clearRetryTimeout();
    setProfile(null);
    setProfileLoading(false);
    setProfileError(null);
    isCreatingProfile.current = false;
  }, [clearRetryTimeout, setProfileLoading, setProfileError]);

  return {
    profile,
    profileLoading,
    profileError,
    fetchProfileAndSetState: fetchProfileWrapper,
    ensureProfile,
    resetProfileState,
    setProfile,
    isCreatingProfile: isCreatingProfile.current,
    initializeAttempted: initializeAttempted.current
  };
};
