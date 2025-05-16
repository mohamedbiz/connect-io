
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { recoverAuthState } from '@/utils/auth/rate-limiting';
import { logAuth } from '@/utils/auth/auth-logger';

/**
 * Hook for handling session recovery functionality
 */
export const useSessionRecovery = (resetState: () => void) => {
  const [recoveryAttempted, setRecoveryAttempted] = useState(false);
  const [sessionRecoveryInProgress, setSessionRecoveryInProgress] = useState(false);

  const initiateSessionRecovery = async () => {
    if (sessionRecoveryInProgress) return;
    
    setSessionRecoveryInProgress(true);
    logAuth("Starting session recovery procedure", null, 'warn');
    
    try {
      // Clear pending operations first
      await recoverAuthState();
      
      // Sign out completely to reset state
      await supabase.auth.signOut({ scope: 'local' });
      
      // Reset all local state
      resetState();
      
      // Notify user
      toast.warning("Authentication session recovered. Your session has been reset due to an authentication loop. Please sign in again.");
    } catch (error) {
      logAuth("Session recovery failed:", error, 'error');
      toast.error("Session recovery failed. Please refresh the page.");
    } finally {
      setSessionRecoveryInProgress(false);
      setRecoveryAttempted(true);
    }
  };

  return {
    recoveryAttempted,
    sessionRecoveryInProgress,
    setRecoveryAttempted,
    initiateSessionRecovery
  };
};
