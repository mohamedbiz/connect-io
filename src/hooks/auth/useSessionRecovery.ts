
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { recoverAuthState } from '@/utils/auth/rate-limiting';
import { logAuth } from '@/utils/auth/auth-logger';

/**
 * Hook for handling session recovery functionality
 */
export const useSessionRecovery = (resetState: () => void) => {
  const [recoveryAttempted, setRecoveryAttempted] = useState(false);
  const sessionRecoveryInProgress = useRef(false);
  const lastRecoveryTime = useRef(0);
  
  // Debounce recovery attempts
  const RECOVERY_COOLDOWN = 10000; // 10 seconds between recovery attempts

  const initiateSessionRecovery = async () => {
    // Prevent rapid sequential recovery attempts
    const now = Date.now();
    if (now - lastRecoveryTime.current < RECOVERY_COOLDOWN) {
      logAuth("Recovery attempt throttled", null, 'warning');
      return;
    }
    
    // Prevent multiple simultaneous recovery attempts
    if (sessionRecoveryInProgress.current) {
      logAuth("Session recovery already in progress", null, 'warning');
      return;
    }
    
    sessionRecoveryInProgress.current = true;
    lastRecoveryTime.current = now;
    
    logAuth("Starting session recovery procedure", null, 'warning');
    
    try {
      // Clear pending operations first
      await recoverAuthState();
      
      // Sign out completely to reset state - using scope: 'local' to only affect this browser
      await supabase.auth.signOut({ scope: 'local' });
      
      // Reset all local state
      resetState();
      
      // Notify user
      toast.warning("Authentication session recovered. Your session has been reset due to an authentication issue. Please sign in again.");
    } catch (error) {
      logAuth("Session recovery failed:", error, 'error');
      toast.error("Session recovery failed. Please refresh the page and try again.");
    } finally {
      sessionRecoveryInProgress.current = false;
      setRecoveryAttempted(true);
    }
  };

  return {
    recoveryAttempted,
    sessionRecoveryInProgress: sessionRecoveryInProgress.current,
    setRecoveryAttempted,
    initiateSessionRecovery
  };
};
