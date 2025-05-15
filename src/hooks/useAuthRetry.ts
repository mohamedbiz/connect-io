
import { useState } from 'react';
import { toast } from 'sonner';

// Improved retry mechanism with exponential backoff
export const useAuthRetry = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  // Calculate backoff delay with exponential increase and jitter
  const getBackoffDelay = (): number => {
    const baseDelay = 1000; // Base delay in milliseconds
    const maxDelay = 30000; // Maximum delay (30 seconds)
    const jitter = Math.random() * 0.3; // Add up to 30% randomness
    
    // Calculate exponential backoff with jitter
    const delay = Math.min(
      baseDelay * Math.pow(2, retryCount) * (1 + jitter),
      maxDelay
    );
    
    return delay;
  };

  const retry = async <T>(operation: () => Promise<T>): Promise<T | null> => {
    try {
      setIsRetrying(true);
      return await operation();
    } catch (error: any) {
      setLastError(error.message || 'Operation failed');
      
      const errorMessage = error.message || 'Authentication failed';
      const isRateLimitError = errorMessage.toLowerCase().includes('rate limit');
      
      if (isRateLimitError) {
        toast.error("Too many attempts. Please wait a moment before trying again.");
        
        // Wait longer for rate limit errors
        await new Promise(resolve => setTimeout(resolve, getBackoffDelay() * 2));
      }
      
      setRetryCount(prev => prev + 1);
      return null;
    } finally {
      setIsRetrying(false);
    }
  };

  const resetRetry = () => {
    setRetryCount(0);
    setLastError(null);
  };

  return {
    retry,
    resetRetry,
    retryCount,
    isRetrying,
    lastError,
  };
};

export default useAuthRetry;
