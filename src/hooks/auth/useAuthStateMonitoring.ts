
import { useRef, useEffect } from 'react';
import { logAuth } from '@/utils/auth/auth-logger';

/**
 * Hook for monitoring auth state changes to detect potential loops
 */
export const useAuthStateMonitoring = (
  initiateSessionRecovery: () => void,
  recoveryAttempted: boolean
) => {
  const authStateChangeCount = useRef(0);
  const lastChangeTime = useRef(Date.now());

  // Monitor for potential auth refresh loops and add circuit breaker
  useEffect(() => {
    if (authStateChangeCount.current > 20 && !recoveryAttempted) {
      const timeSinceLastChange = Date.now() - lastChangeTime.current;
      
      // Only initiate recovery if changes are happening rapidly (less than 5 seconds apart)
      if (timeSinceLastChange < 5000) {
        logAuth(
          "Too many auth state changes detected. Possible auth loop. Initiating recovery.", 
          { count: authStateChangeCount.current }, 
          'error'
        );
        initiateSessionRecovery();
      }
    }
  }, [authStateChangeCount.current, recoveryAttempted, initiateSessionRecovery]);

  // Track auth state changes to detect potential loops
  const trackAuthStateChange = () => {
    const now = Date.now();
    const timeSinceLastChange = now - lastChangeTime.current;
    lastChangeTime.current = now;
    
    // Only increment the counter if changes are happening rapidly
    if (timeSinceLastChange < 2000) {
      authStateChangeCount.current += 1;
      
      // Log warning if too many auth state changes
      if (authStateChangeCount.current > 10 && authStateChangeCount.current % 5 === 0) {
        logAuth(`High frequency of auth state changes detected (${authStateChangeCount.current}). Possible auth loop.`, 
          { timeSinceLastChange }, 
          'warning'
        );
        
        if (authStateChangeCount.current > 20 && !recoveryAttempted) {
          logAuth("Auth state change threshold exceeded. Initiating recovery.", null, 'warning');
          initiateSessionRecovery();
          return; // Don't increment further during recovery
        }
      }
    } else {
      // If changes are slower, start counting again
      // This prevents false positives from normal usage
      authStateChangeCount.current = 0;
    }
  };

  return {
    authStateChangeCount: authStateChangeCount.current,
    trackAuthStateChange,
    resetAuthStateChangeCount: () => { authStateChangeCount.current = 0; }
  };
};
