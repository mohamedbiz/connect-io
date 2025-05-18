
import { useRef, useCallback } from "react";
import { logAuth } from "@/utils/auth/auth-logger";

// Increased threshold for detecting potential auth loops
const AUTH_CHANGE_THRESHOLD = 20;
// Minimum time between changes to consider as a potential loop
const MIN_CHANGE_INTERVAL = 500; // milliseconds

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
  const authChangeSequenceStartTime = useRef(Date.now());

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
    
    // If this change happened after a significant delay, reset the counter
    if (timeSinceLastChange > 5000) {
      authStateChangeCount.current = 0;
      authChangeSequenceStartTime.current = now;
      return;
    }
    
    // Count auth state changes to detect potential loops
    authStateChangeCount.current += 1;
    
    // Calculate average frequency across the entire sequence
    const averageInterval = (now - authChangeSequenceStartTime.current) / authStateChangeCount.current;
    
    // Only consider it a loop if changes are happening too rapidly and we've seen enough of them
    if (authStateChangeCount.current > AUTH_CHANGE_THRESHOLD && averageInterval < MIN_CHANGE_INTERVAL) {
      logAuth(`Potential auth loop detected (${authStateChangeCount.current} changes, avg interval: ${averageInterval.toFixed(2)}ms)`, null, "warning");
      
      // Circuit breaker with higher threshold
      if (authStateChangeCount.current > 30) {
        logAuth("Auth loop circuit breaker triggered - initiating session recovery", null, "warning");
        initiateSessionRecovery();
      }
    }
  }, [initiateSessionRecovery, recoveryAttempted]);

  return {
    trackAuthStateChange,
    authStateChangeCount: authStateChangeCount.current
  };
};
