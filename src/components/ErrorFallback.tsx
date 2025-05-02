
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ErrorFallbackProps {
  error: Error | null;
  resetErrorBoundary?: () => void;
  message?: string;
}

const ErrorFallback = ({ 
  error, 
  resetErrorBoundary,
  message = "Something went wrong."
}: ErrorFallbackProps) => {
  return (
    <div className="p-6 rounded-lg border border-red-200 bg-red-50">
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      
      {error && (
        <div className="mb-4 p-4 bg-white rounded border border-gray-200 overflow-auto max-h-[200px]">
          <p className="text-sm font-mono text-red-600">{error.message}</p>
        </div>
      )}
      
      {resetErrorBoundary && (
        <Button 
          variant="outline" 
          onClick={resetErrorBoundary} 
          className="flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorFallback;
