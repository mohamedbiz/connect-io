
/**
 * Helper for improved exponential backoff with jitter
 */
export const getBackoffDelay = (attempt: number, baseDelay = 1000): number => {
  // Add some randomness to avoid thundering herd problem
  const jitter = Math.random() * 500;
  return Math.min(baseDelay * Math.pow(1.5, attempt) + jitter, 6000); // Cap at 6 seconds
};

/**
 * Utility to handle rate limiting for profile operations
 */
export const applyRateLimiting = async (lastActionTime: number, minInterval = 800): Promise<void> => {
  const now = Date.now();
  const timeSinceLastAction = now - lastActionTime;
  
  if (timeSinceLastAction < minInterval) {
    const waitTime = minInterval - timeSinceLastAction;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
};
