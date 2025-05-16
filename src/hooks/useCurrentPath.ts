
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useCurrentPath(): string {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return currentPath;
}
