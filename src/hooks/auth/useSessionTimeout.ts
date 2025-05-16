
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { logAuth } from '@/utils/auth/auth-logger';

/**
 * Hook for managing session timeout to prevent infinite loading
 */
export const useSessionTimeout = (loading: boolean, authInitialized: boolean) => {
  // Force end loading state after timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        logAuth("Forcing end of loading state after timeout", null, 'warn');
        
        // Show toast if we had to force end loading
        if (!authInitialized) {
          toast.error("Authentication is taking longer than expected. You may need to refresh the page if you experience issues.");
        }
        
        return true; // Signal that we force-ended loading
      }
      return false;
    }, 7000); // 7 seconds timeout

    return () => clearTimeout(timer);
  }, [loading, authInitialized]);

  return {};
};
