
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkNetworkConnection } from '@/integrations/supabase/client';

interface OfflineAlertProps {
  onRetry?: () => void;
}

const OfflineAlert: React.FC<OfflineAlertProps> = ({ onRetry }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [checking, setChecking] = useState(false);

  const checkNetwork = async () => {
    setChecking(true);
    const isOnline = await checkNetworkConnection();
    setIsOffline(!isOnline);
    setChecking(false);
    
    if (isOnline && onRetry) {
      onRetry();
    }
  };

  useEffect(() => {
    // Check network status on mount
    checkNetwork();
    
    // Set up event listeners for online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <WifiOff className="h-4 w-4 mr-2" />
      <AlertTitle>You Appear to be Offline</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>
          We can't connect to our servers. Please check your internet connection.
        </p>
        <Button 
          variant="outline" 
          onClick={checkNetwork}
          className="flex items-center gap-2"
          disabled={checking}
        >
          <RefreshCw className={`h-4 w-4 ${checking ? 'animate-spin' : ''}`} />
          {checking ? 'Checking...' : 'Check Connection'}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default OfflineAlert;
