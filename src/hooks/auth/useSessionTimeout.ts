
import { useEffect, useRef } from "react";
import { logAuth } from "@/utils/auth/auth-logger";

/**
 * Hook to handle session timeout to prevent infinite loading states
 */
export const useSessionTimeout = (
  loading: boolean,
  authInitialized: boolean,
  setLoading: (state: boolean) => void
) => {
  const timeoutIdRef = useRef<number | null>(null);

  // Force end loading state after timeout to prevent infinite loading
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    
    // Only set timeout if we're in a loading state
    if (loading && !authInitialized) {
      timeoutIdRef.current = window.setTimeout(() => {
        if (loading) {
          logAuth("Forcing end of loading state due to timeout", null, "warning");
          // Directly update loading state to prevent infinite loading
          setLoading(false);
        }
      }, 15000); // 15 seconds max loading time
    }
    
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [loading, authInitialized, setLoading]);
};
