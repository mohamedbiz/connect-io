
import { useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";
import { shouldRedirectToAcquisition } from "@/utils/redirect-utils";

export const useAuthRedirection = () => {
  const handleShouldRedirectToAcquisition = useCallback(
    (currentPath: string, loading: boolean, user: User | null, profile: Profile | null) => {
      return shouldRedirectToAcquisition(currentPath, loading, user, profile);
    },
    []
  );

  return {
    handleShouldRedirectToAcquisition
  };
};
