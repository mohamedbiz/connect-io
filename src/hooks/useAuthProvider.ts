
import { useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";
import { useSessionMonitoring } from "./useSessionMonitoring";
import { useProfileManagement } from "./useProfileManagement";
import { useAuthOperations } from "./useAuthOperations";
import { useAuthRedirection } from "./useAuthRedirection";
import { safeAuthOperation } from "@/utils/auth/rate-limiting";
import { logAuth } from "@/utils/auth/auth-logger";
import { useQualificationStatus } from "./useQualificationStatus";
import { useCurrentPath } from "./useCurrentPath";

export const useAuthProvider = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const currentPath = useCurrentPath();

  // Use our enhanced profile management hook
  const {
    profile,
    profileLoading,
    profileError,
    fetchProfileAndSetState,
    ensureProfile,
    resetProfileState,
    isCreatingProfile
  } = useProfileManagement();

  // Use session monitoring hook
  const {
    user,
    session,
    loading,
    setUser,
    setSession,
    setLoading
  } = useSessionMonitoring(fetchProfileAndSetState, resetProfileState, setAuthError);

  // Use auth operations hook for login/logout
  const {
    logout: performLogout,
    login,
    register
  } = useAuthOperations();

  // Use auth redirection hook
  const {
    handleShouldRedirectToAcquisition,
    handleShouldRedirectToQualification
  } = useAuthRedirection();

  // Check qualification status
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();

  // Ensure a profile exists for the current user
  const ensureUserProfile = useCallback(async (): Promise<Profile | null> => {
    if (!user) return null;
    logAuth("Ensuring user profile exists", { userId: user.id });
    return await ensureProfile(user);
  }, [user, ensureProfile]);

  // Logout function with improved error handling
  const logout = useCallback(async () => {
    logAuth("Logging out");
    await safeAuthOperation(async () => {
      try {
        const success = await performLogout();
        if (success) {
          setUser(null);
          setSession(null);
          resetProfileState();
          setAuthError(null);
          logAuth("Logout successful");
        } else {
          logAuth("Logout failed", null, "error", true);
          setAuthError("Failed to log out. Please try again.");
        }
      } catch (error) {
        logAuth("Logout error:", error, "error", true);
        setAuthError("An error occurred during logout. Please try again.");
      }
    }, "logout");
  }, [performLogout, setUser, setSession, resetProfileState, setAuthError]);

  // Function to decide if we should redirect founders to acquisition
  const shouldRedirectToAcquisition = useCallback((path: string = currentPath || '') => {
    return handleShouldRedirectToAcquisition(
      path,
      loading || profileLoading || isCreatingProfile,
      user,
      profile
    );
  }, [handleShouldRedirectToAcquisition, loading, profileLoading, isCreatingProfile, user, profile, currentPath]);

  // Function to decide if we should redirect founders to qualification
  const shouldRedirectToQualification = useCallback((path: string = currentPath || '') => {
    return handleShouldRedirectToQualification(
      path,
      loading || profileLoading || isCreatingProfile || qualificationLoading,
      user,
      profile
    );
  }, [handleShouldRedirectToQualification, loading, profileLoading, isCreatingProfile, qualificationLoading, user, profile, currentPath]);

  return {
    user,
    session,
    profile,
    loading: loading || profileLoading || qualificationLoading,
    error: authError || profileError,
    logout,
    shouldRedirectToAcquisition,
    shouldRedirectToQualification,
    login,
    register,
    ensureProfile: ensureUserProfile
  };
};
