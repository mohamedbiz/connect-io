
import { useState, useCallback, useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";
import { useProfileFetching } from "./profile/useProfileFetching";
import { ensureUserProfileExists } from "@/utils/profile/profileCreation";

export const useProfileManagement = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const isCreatingProfile = useRef<boolean>(false);
  
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
    return fetchProfileAndSetState(userId, setProfile);
  }, [fetchProfileAndSetState]);

  // Function to manually create a profile
  const ensureProfile = useCallback(async (user: User | null): Promise<Profile | null> => {
    if (isCreatingProfile.current) {
      return null;
    }
    
    isCreatingProfile.current = true;
    try {
      const result = await ensureUserProfileExists(
        user, 
        profile, 
        lastFetchTime,
        setProfileLoading,
        setProfile,
        setProfileError
      );
      return result;
    } finally {
      isCreatingProfile.current = false;
    }
  }, [profile, lastFetchTime, setProfileLoading, setProfileError]);

  const resetProfileState = useCallback(() => {
    clearRetryTimeout();
    setProfile(null);
    setProfileLoading(false);
    setProfileError(null);
    isCreatingProfile.current = false;
  }, [clearRetryTimeout]);

  return {
    profile,
    profileLoading,
    profileError,
    fetchProfileAndSetState: fetchProfileWrapper,
    ensureProfile,
    resetProfileState,
    setProfile,
    isCreatingProfile: isCreatingProfile.current
  };
};
