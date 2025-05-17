
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

/**
 * Hook to get the current path from the URL
 * @returns The current path without query parameters
 */
export const useCurrentPath = (): string => {
  const location = useLocation();
  
  return useMemo(() => {
    return location.pathname;
  }, [location.pathname]);
};
