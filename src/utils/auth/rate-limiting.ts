
import { toast } from "sonner";
import { logAuth } from "./auth-logger";

// Track operation timestamps to prevent too many quick auth operations
const operationTimestamps: Record<string, number[]> = {
  login: [],
  register: [],
  oauth: [],
  passwordReset: [],
  verify: []
};

// Configuration for rate limits
const RATE_LIMIT_CONFIG = {
  maxOperations: 5,      // Max number of operations
  timeWindowMs: 60000,   // Time window in milliseconds (1 minute)
  minWaitTimeMs: 1000    // Minimum wait time between operations (1 second)
};

/**
 * Checks if an operation should be rate limited
 */
function shouldRateLimit(operation: keyof typeof operationTimestamps): boolean {
  const now = Date.now();
  const timestamps = operationTimestamps[operation];
  
  // Clean up old timestamps
  const validTimestamps = timestamps.filter(
    time => now - time < RATE_LIMIT_CONFIG.timeWindowMs
  );
  operationTimestamps[operation] = validTimestamps;
  
  // Check for too many operations in the time window
  if (validTimestamps.length >= RATE_LIMIT_CONFIG.maxOperations) {
    return true;
  }
  
  // Check for operations happening too quickly
  if (validTimestamps.length > 0) {
    const lastOperation = Math.max(...validTimestamps);
    if (now - lastOperation < RATE_LIMIT_CONFIG.minWaitTimeMs) {
      return true;
    }
  }
  
  // Operation is allowed - record the timestamp
  operationTimestamps[operation].push(now);
  return false;
}

/**
 * Safely executes an auth operation with rate limiting
 */
export async function safeAuthOperation<T>(
  operation: () => Promise<T>,
  operationType: keyof typeof operationTimestamps = "login"
): Promise<T> {
  // Check rate limiting
  if (shouldRateLimit(operationType)) {
    const message = "Too many authentication attempts. Please wait a moment.";
    toast.error(message);
    logAuth(message, { operationType }, "error");
    throw new Error(message);
  }
  
  return operation();
}

/**
 * Resets rate limiting state - used for recovery
 */
export async function recoverAuthState(): Promise<void> {
  // Reset all operation timestamps
  Object.keys(operationTimestamps).forEach(key => {
    operationTimestamps[key as keyof typeof operationTimestamps] = [];
  });
  
  logAuth("Auth rate limiting state has been reset", null, "info");
}
