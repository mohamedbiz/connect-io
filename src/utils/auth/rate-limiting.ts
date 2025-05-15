
// Helper functions for auth rate limiting

let lastAuthOperation = 0;
let pendingOperations = 0;
let rateExceededCount = 0;
const MAX_CONCURRENT_OPERATIONS = 2;
export const MIN_AUTH_OPERATION_INTERVAL = 1000; // Increased from 800ms to 1000ms

/**
 * Apply rate limiting to auth operations with better concurrent operation handling
 */
export const safeAuthOperation = async (operation: () => Promise<void>) => {
  // Increase pending operations counter
  pendingOperations++;
  
  // Check if we're exceeding concurrent operation limits
  if (pendingOperations > MAX_CONCURRENT_OPERATIONS) {
    console.warn(`Rate limiting: ${pendingOperations} concurrent auth operations. Queueing...`);
    rateExceededCount++;
    
    // If we have too many rate limit hits, add an extra delay
    if (rateExceededCount > 5) {
      console.error("Too many rate limit hits. Adding circuit breaker delay.");
      await new Promise(resolve => setTimeout(resolve, 3000));
      rateExceededCount = 0;
    }
  }
  
  try {
    const now = Date.now();
    const timeSinceLastOperation = now - lastAuthOperation;
    
    if (timeSinceLastOperation < MIN_AUTH_OPERATION_INTERVAL) {
      const waitTime = MIN_AUTH_OPERATION_INTERVAL - timeSinceLastOperation;
      console.log(`Rate limiting auth operation, waiting ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    lastAuthOperation = Date.now();
    await operation();
  } finally {
    // Always decrement pending operations counter
    pendingOperations--;
    
    // Reset rate exceeded count if we're back to normal levels
    if (pendingOperations <= MAX_CONCURRENT_OPERATIONS) {
      rateExceededCount = 0;
    }
  }
};
