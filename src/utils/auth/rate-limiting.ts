
// Helper functions for auth rate limiting

let lastAuthOperation = 0;
export const MIN_AUTH_OPERATION_INTERVAL = 800; // ms

/**
 * Apply rate limiting to auth operations
 */
export const safeAuthOperation = async (operation: () => Promise<void>) => {
  const now = Date.now();
  const timeSinceLastOperation = now - lastAuthOperation;
  
  if (timeSinceLastOperation < MIN_AUTH_OPERATION_INTERVAL) {
    const waitTime = MIN_AUTH_OPERATION_INTERVAL - timeSinceLastOperation;
    console.log(`Rate limiting auth operation, waiting ${waitTime}ms`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastAuthOperation = Date.now();
  await operation();
};
