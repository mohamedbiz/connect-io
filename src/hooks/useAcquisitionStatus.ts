
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AcquisitionStatus } from "@/types/auth";

/**
 * Hook for managing user acquisition status
 */
export function useAcquisitionStatus(userId: string | undefined) {
  const [acquisitionStatus, setAcquisitionStatus] = useState<AcquisitionStatus>({
    completed: false,
    checked: false
  });

  // Check acquisition status whenever the user ID changes
  useEffect(() => {
    if (userId) {
      checkAcquisitionStatusAndSetState(userId);
    } else {
      // Reset status if no user ID is provided
      setAcquisitionStatus({completed: false, checked: true});
    }
  }, [userId]);

  async function checkAcquisitionStatusAndSetState(userId: string) {
    const status = await checkAcquisitionStatus(userId);
    setAcquisitionStatus(status);
  }

  async function checkAcquisitionStatus(userId: string): Promise<AcquisitionStatus> {
    try {
      // Use "founder_onboarding" table to check acquisition status
      const { data, error } = await supabase
        .from("founder_onboarding")
        .select("acquisition_completed")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking acquisition status:", error);
        return {completed: false, checked: true};
      } else {
        return {
          completed: Boolean(data?.acquisition_completed),
          checked: true
        };
      }
    } catch (err) {
      console.error("Error in acquisition status check:", err);
      return {completed: false, checked: true};
    }
  }

  return { acquisitionStatus, checkAcquisitionStatusAndSetState };
}
