
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";
import { useSessionMonitoring } from "./useSessionMonitoring";
import { useProfileManagement } from "./useProfileManagement";
import { useAuthOperations } from "./useAuthOperations";
import { useAuthRedirection } from "./useAuthRedirection";
import { safeAuthOperation } from "@/utils/auth/rate-limiting";

export const useAuthProvider = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    profile,
    profileLoading,
    profileError,
    fetchProfileAndSetState,
    ensureProfile,
    resetProfileState,
  } = useProfileManagement();

  const {
    user,
    session,
    loading,
    setUser,
    setSession,
    setLoading
  } = useSessionMonitoring(fetchProfileAndSetState, resetProfileState, setAuthError);

  const {
    logout: performLogout,
    login,
    register
  } = useAuthOperations();

  const { handleShouldRedirectToAcquisition } = useAuthRedirection();

  // Function to ensure a profile exists
  const ensureUserProfile = async (): Promise<Profile | null> => {
    if (!user) return null;
    return await ensureProfile(user);
  };

  async function logout() {
    await safeAuthOperation(async () => {
      const success = await performLogout();
      if (success) {
        setUser(null);
        setSession(null);
        resetProfileState();
        setAuthError(null);
      }
    });
  }

  // Function to decide if we should redirect founders
  function shouldRedirectToAcquisition(currentPath: string) {
    return handleShouldRedirectToAcquisition(
      currentPath, 
      loading || profileLoading, 
      user, 
      profile
    );
  }

  return {
    user,
    session,
    profile,
    loading: loading || profileLoading,
    error: authError || profileError,
    logout,
    shouldRedirectToAcquisition,
    login,
    register,
    ensureProfile: ensureUserProfile
  };
};
