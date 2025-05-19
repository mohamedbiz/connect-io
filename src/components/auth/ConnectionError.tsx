
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';

interface ConnectionErrorProps {
  retryAuth: () => void;
}

const ConnectionError = ({ retryAuth }: ConnectionErrorProps) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <WifiOff className="h-4 w-4 mr-2" />
      <AlertTitle>Network Connection Error</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>
          We're having trouble connecting to our servers. Please check your internet connection.
        </p>
        <Button 
          variant="outline" 
          onClick={() => retryAuth()}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Retry Connection
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionError;
