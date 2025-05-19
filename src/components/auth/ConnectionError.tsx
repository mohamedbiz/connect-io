
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';
import { checkNetworkConnection } from '@/integrations/supabase/client';

interface ConnectionErrorProps {
  retryAuth: () => void;
}

const ConnectionError = ({ retryAuth }: ConnectionErrorProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    
    // Check if we're back online first
    const isOnline = await checkNetworkConnection();
    
    if (isOnline) {
      // If online, attempt to retry auth operations
      retryAuth();
    }
    
    setIsRetrying(false);
  };

  return (
    <Alert variant="destructive" className="mb-4">
      <WifiOff className="h-4 w-4 mr-2" />
      <AlertTitle>Network Connection Error</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>
          We're having trouble connecting to our servers. This could be due to:
        </p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Your internet connection is down</li>
          <li>Our servers might be temporarily unavailable</li>
          <li>Your network might be blocking the connection</li>
        </ul>
        <Button 
          variant="outline" 
          onClick={handleRetry}
          disabled={isRetrying}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />
          {isRetrying ? 'Retrying...' : 'Retry Connection'}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionError;
