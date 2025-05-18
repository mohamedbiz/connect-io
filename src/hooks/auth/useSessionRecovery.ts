
import { useRef, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { logAuth } from "@/utils/auth/auth-logger";

/**
 * Hook for handling session recovery in case of auth issues
 */
export const useSessionRecovery = (
  resetState: () => void
) => {
  const sessionRecoveryInProgress = useRef(false);
  const recoveryAttemptedRef = useRef(false);

  // Handle recovery from potential auth loops
  const initiateSessionRecovery = useCallback(async () => {
    if (sessionRecoveryInProgress.current) return;
    
    sessionRecoveryInProgress.current = true;
    recoveryAttemptedRef.current = true;
    logAuth("Session recovery: Signing out to reset auth state", null, 'warning');
    
    try {
      // Sign out completely to reset state
      await supabase.auth.signOut({ scope: 'local' });
      
      // Reset all local state
      resetState();
      
      // Notify user
      toast.warning("Your session has been reset due to an authentication issue. Please sign in again.");
    } catch (error) {
      logAuth("Session recovery failed:", error, 'error');
    } finally {
      sessionRecoveryInProgress.current = false;
    }
  }, [resetState]);

  return {
    recoveryAttempted: recoveryAttemptedRef.current,
    initiateSessionRecovery
  };
};
