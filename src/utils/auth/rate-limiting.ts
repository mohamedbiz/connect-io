
const authOperations: Record<string, number> = {};
const AUTH_OPERATION_COOLDOWN = 1000; // 1 second

/**
 * Throttle auth operations to prevent accidental multiple submissions
 * @param operation Function to execute
 * @param operationName Unique identifier for this operation type
 * @returns Result of the operation
 */
export const safeAuthOperation = async <T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> => {
  const now = Date.now();
  const lastOpTime = authOperations[operationName] || 0;
  
  // Prevent rapid sequential operations of the same type
  if (now - lastOpTime < AUTH_OPERATION_COOLDOWN) {
    console.log(`Operation "${operationName}" throttled. Please wait.`);
    throw new Error(`Please wait before trying ${operationName} again.`);
  }
  
  // Record the operation time
  authOperations[operationName] = now;
  
  try {
    return await operation();
  } catch (error) {
    console.error(`Error during ${operationName} operation:`, error);
    throw error;
  }
};
