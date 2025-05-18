
import { useState, useCallback, useEffect } from "react";
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
import { toast } from "sonner";

export const useAuthProvider = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const currentPath = useCurrentPath();
  const [authInitialized, setAuthInitialized] = useState(false);

  // Use our enhanced profile management hook
  const {
    profile,
    profileLoading,
    profileError,
    fetchProfileAndSetState,
    ensureProfile,
    resetProfileState,
    isCreatingProfile,
    initializeAttempted
  } = useProfileManagement();

  // Wrapper for fetchProfileAndSetState to handle void return type
  const fetchProfileWrapper = useCallback(async (userId: string): Promise<void> => {
    if (!userId) {
      logAuth("Cannot fetch profile - invalid userId", null, "warning");
      return;
    }

    try {
      await fetchProfileAndSetState(userId);
    } catch (error) {
      logAuth("Error in fetchProfileWrapper:", error, "error");
    }
  }, [fetchProfileAndSetState]);

  // Use session monitoring hook
  const {
    user,
    session,
    loading: authLoading,
    setUser,
    setSession,
    setLoading: setAuthLoading
  } = useSessionMonitoring(fetchProfileWrapper, resetProfileState, setAuthError);

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

  // Attempt to ensure profile exists when user is available
  useEffect(() => {
    // Skip if no user or if profile exists or if we're loading
    if (!user || profile || authLoading || profileLoading || isCreatingProfile) {
      return;
    }

    // If we have a user but no profile, and we've tried to fetch it already,
    // ensure the profile exists (create if needed)
    if (initializeAttempted && !profile) {
      logAuth("No profile found after initialization, ensuring profile exists", { userId: user.id }, "warning");
      
      // Delay slightly to avoid potential auth state conflicts
      const timeoutId = setTimeout(() => {
        ensureProfile(user).catch(error => {
          logAuth("Failed to ensure profile exists:", error, "error");
          toast.error("Could not load your profile. Please try refreshing the page.");
        });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [user, profile, authLoading, profileLoading, isCreatingProfile, initializeAttempted, ensureProfile]);

  // Set auth to initialized once we've done initial loading
  useEffect(() => {
    if (!authInitialized && !authLoading) {
      setAuthInitialized(true);
    }
  }, [authLoading, authInitialized]);

  // Ensure a profile exists for the current user
  const ensureUserProfile = useCallback(async (): Promise<Profile | null> => {
    if (!user) return null;
    logAuth("Ensuring user profile exists", { userId: user.id });
    return await ensureProfile(user);
  }, [user, ensureProfile]);

  // Logout function with improved error handling
  const logout = useCallback(async () => {
    logAuth("Logging out", null);
    await safeAuthOperation(async () => {
      try {
        const success = await performLogout();
        if (success) {
          setUser(null);
          setSession(null);
          resetProfileState();
          setAuthError(null);
          logAuth("Logout successful", null);
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
      authLoading || profileLoading || isCreatingProfile,
      user,
      profile
    );
  }, [handleShouldRedirectToAcquisition, authLoading, profileLoading, isCreatingProfile, user, profile, currentPath]);

  // Function to decide if we should redirect founders to qualification
  const shouldRedirectToQualification = useCallback((path: string = currentPath || '') => {
    return handleShouldRedirectToQualification(
      path,
      authLoading || profileLoading || isCreatingProfile || qualificationLoading,
      user,
      profile,
      isQualified
    );
  }, [handleShouldRedirectToQualification, authLoading, profileLoading, isCreatingProfile, qualificationLoading, user, profile, isQualified, currentPath]);

  // Combined loading state
  const isLoading = authLoading || profileLoading || qualificationLoading;

  // Combined error state
  const error = authError || profileError;

  return {
    user,
    session,
    profile,
    loading: isLoading,
    error,
    logout,
    shouldRedirectToAcquisition,
    shouldRedirectToQualification,
    login,
    register,
    ensureProfile: ensureUserProfile
  };
};
