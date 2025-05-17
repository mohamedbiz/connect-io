
import { useState, useEffect } from 'react';
import { logAuth } from '@/utils/auth/auth-logger';

/**
 * Hook for monitoring auth state changes to detect potential loops
 */
export const useAuthStateMonitoring = (
  initiateSessionRecovery: () => void,
  recoveryAttempted: boolean
) => {
  const [authStateChangeCount, setAuthStateChangeCount] = useState(0);

  // Monitor for potential auth refresh loops and add circuit breaker
  useEffect(() => {
    if (authStateChangeCount > 25 && !recoveryAttempted) {
      logAuth("Too many auth state changes detected. Possible auth loop. Initiating recovery.", null, 'error');
      initiateSessionRecovery();
    }
  }, [authStateChangeCount, recoveryAttempted, initiateSessionRecovery]);

  // Track auth state changes to detect potential loops
  const trackAuthStateChange = () => {
    setAuthStateChangeCount(prev => {
      const newCount = prev + 1;
      
      // Log warning if too many auth state changes
      if (newCount > 10 && newCount % 5 === 0) {
        logAuth(`High frequency of auth state changes detected (${newCount}). Possible auth loop.`, null, 'warning');
        
        if (newCount > 25 && !recoveryAttempted) {
          logAuth("Auth state change threshold exceeded. Initiating recovery.", null, 'warning');
          initiateSessionRecovery();
          return prev; // Don't increment further during recovery
        }
      }
      
      return newCount;
    });
  };

  return {
    authStateChangeCount,
    trackAuthStateChange,
    setAuthStateChangeCount
  };
};
