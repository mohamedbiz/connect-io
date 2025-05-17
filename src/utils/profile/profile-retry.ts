
/**
 * Calculate exponential backoff delay
 * @param retryCount Current retry attempt
 * @returns Delay in milliseconds
 */
export const getBackoffDelay = (retryCount: number): number => {
  // Base delay of 300ms, doubled for each retry with some random jitter
  const baseDelay = 300;
  const exponentialDelay = baseDelay * Math.pow(2, retryCount);
  const jitter = Math.random() * 0.3 * exponentialDelay;
  
  return Math.min(exponentialDelay + jitter, 5000); // Cap at 5 seconds
};

/**
 * Apply rate limiting to prevent too many requests
 * @param lastRequestTime Timestamp of the last request
 * @param minDelay Minimum delay between requests in ms (default: 500ms)
 */
export const applyRateLimiting = async (lastRequestTime: number, minDelay = 500): Promise<void> => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (lastRequestTime > 0 && timeSinceLastRequest < minDelay) {
    const delayNeeded = minDelay - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, delayNeeded));
  }
};
