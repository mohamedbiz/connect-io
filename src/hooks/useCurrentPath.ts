
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to get the current path from the location object
 * @returns The current path
 */
export function useCurrentPath(): string {
  try {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState<string>(location.pathname);

    useEffect(() => {
      setCurrentPath(location.pathname);
    }, [location.pathname]);

    return currentPath;
  } catch (error) {
    // Return an empty string if not in a Router context
    return '';
  }
}
