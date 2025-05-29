
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WifiOff } from 'lucide-react';

interface RegisterNetworkAlertProps {
  onRetry: () => void;
}

const RegisterNetworkAlert = ({ onRetry }: RegisterNetworkAlertProps) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <WifiOff className="h-4 w-4 mr-2" />
      <AlertTitle>Network Connection Error</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>We're having trouble connecting to our servers. This could be due to:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Your internet connection is down</li>
          <li>Your network might be blocking the connection</li>
          <li>Our servers might be temporarily unavailable</li>
        </ul>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRetry}
          className="mt-2"
        >
          Retry Connection
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default RegisterNetworkAlert;
