
import { useRef, useCallback } from "react";
import { logAuth } from "@/utils/auth/auth-logger";

// Threshold for detecting potential auth loops
const AUTH_CHANGE_THRESHOLD = 10;

/**
 * Hook for monitoring auth state changes and detecting potential loops
 */
export const useAuthStateMonitoring = (
  initiateSessionRecovery: () => Promise<void>,
  recoveryAttempted: boolean
) => {
  // Track auth state changes to detect potential loops
  const authStateChangeCount = useRef(0);
  const lastAuthChangeTime = useRef(Date.now());

  /**
   * Track and analyze auth state changes to detect potential auth loops
   */
  const trackAuthStateChange = useCallback(() => {
    // Don't track changes if recovery has already been attempted
    if (recoveryAttempted) return;

    // Check for potential auth loop by measuring frequency
    const now = Date.now();
    const timeSinceLastChange = now - lastAuthChangeTime.current;
    lastAuthChangeTime.current = now;
    
    // Count auth state changes to detect potential loops
    authStateChangeCount.current += 1;
    
    // If changes are happening too rapidly, it may indicate a loop
    if (authStateChangeCount.current > AUTH_CHANGE_THRESHOLD && timeSinceLastChange < 1000) {
      logAuth(`Potential auth loop detected (${authStateChangeCount.current} changes)`, null, "warning");
      
      if (authStateChangeCount.current > 25) {
        // Circuit breaker: attempt recovery
        initiateSessionRecovery();
      }
    }
  }, [initiateSessionRecovery, recoveryAttempted]);

  return {
    trackAuthStateChange,
    authStateChangeCount: authStateChangeCount.current
  };
};
