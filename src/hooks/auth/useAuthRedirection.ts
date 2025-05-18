
import { useCallback } from "react";
import { Profile } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { shouldRedirectToAcquisition, shouldRedirectToQualification } from "@/utils/redirect-utils";

export const useAuthRedirection = () => {
  /**
   * Determines if a founder user should be redirected to the acquisition page
   * based on their onboarding status
   */
  const handleShouldRedirectToAcquisition = useCallback((
    currentPath: string,
    loading: boolean,
    user: User | null,
    profile: Profile | null
  ): boolean => {
    return shouldRedirectToAcquisition(currentPath, loading, user, profile);
  }, []);

  /**
   * Determines if a founder user should be redirected to the qualification page
   * based on their qualification status
   */
  const handleShouldRedirectToQualification = useCallback((
    currentPath: string,
    loading: boolean,
    user: User | null,
    profile: Profile | null,
    isQualified: boolean | undefined
  ): boolean => {
    return shouldRedirectToQualification(
      currentPath,
      loading,
      user,
      profile,
      isQualified
    );
  }, []);

  return {
    handleShouldRedirectToAcquisition,
    handleShouldRedirectToQualification
  };
};
