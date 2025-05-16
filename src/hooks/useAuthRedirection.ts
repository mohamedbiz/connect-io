
import { useCallback } from "react";
import { Profile } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { shouldRedirectToAcquisition, shouldRedirectToQualification } from "@/utils/redirect-utils";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";

export const useAuthRedirection = () => {
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();

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
    profile: Profile | null
  ): boolean => {
    return shouldRedirectToQualification(
      currentPath,
      loading || qualificationLoading,
      user,
      profile,
      isQualified
    );
  }, [isQualified, qualificationLoading]);

  return {
    handleShouldRedirectToAcquisition,
    handleShouldRedirectToQualification
  };
};
