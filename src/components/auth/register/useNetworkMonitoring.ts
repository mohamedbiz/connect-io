
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { checkNetworkConnection } from '@/integrations/supabase/client';

export const useNetworkMonitoring = () => {
  const [networkAvailable, setNetworkAvailable] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      const isOnline = await checkNetworkConnection();
      setNetworkAvailable(isOnline);
      
      if (!isOnline) {
        toast.error('Network connection unavailable');
      }
    };
    
    checkNetwork();
    
    const handleOnline = () => setNetworkAvailable(true);
    const handleOffline = () => setNetworkAvailable(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { networkAvailable, setNetworkAvailable };
};
