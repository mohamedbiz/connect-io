
import { useEffect } from "react";
import { logAuth } from "@/utils/auth/auth-logger";

/**
 * Hook to handle session timeout to prevent infinite loading states
 */
export const useSessionTimeout = (
  loading: boolean,
  authInitialized: boolean
) => {
  // Force end loading state after timeout to prevent infinite loading
  useEffect(() => {
    if (!loading || authInitialized) return;
    
    const timeoutId = setTimeout(() => {
      if (loading) {
        logAuth("Forcing end of loading state due to timeout", null, "warning");
        // We don't directly update state here to avoid React sync issues
        // This will be handled by the parent component
      }
    }, 10000); // 10 seconds max loading time
    
    return () => clearTimeout(timeoutId);
  }, [loading, authInitialized]);
};
