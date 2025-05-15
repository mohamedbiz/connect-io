
// Helper functions for auth rate limiting

let lastAuthOperation = 0;
let pendingOperations = 0;
let rateExceededCount = 0;
const MAX_CONCURRENT_OPERATIONS = 2;
const MIN_AUTH_OPERATION_INTERVAL = 1500; // Increased from 1000ms to 1500ms
const CIRCUIT_BREAKER_THRESHOLD = 5;
const CIRCUIT_BREAKER_DELAY = 4000; // Increased from 3000ms to 4000ms

// Queue for operations that can't be executed immediately
const operationQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

// Track operations to deduplicate identical ones
const pendingOperationMap = new Map<string, Promise<void>>();

/**
 * Apply rate limiting to auth operations with improved concurrency control and deduplication
 */
export const safeAuthOperation = async (operation: () => Promise<void>, operationKey?: string) => {
  // Check for duplicate operations to prevent redundant requests
  if (operationKey && pendingOperationMap.has(operationKey)) {
    console.log(`Deduplicating operation: ${operationKey}`);
    return pendingOperationMap.get(operationKey);
  }

  // Create a promise for this operation
  const operationPromise = new Promise<void>(async (resolve, reject) => {
    // Increase pending operations counter
    pendingOperations++;
    
    // Check if we're exceeding concurrent operation limits
    if (pendingOperations > MAX_CONCURRENT_OPERATIONS) {
      console.warn(`Rate limiting: ${pendingOperations} concurrent auth operations. Queueing...`);
      rateExceededCount++;
      
      // If we have too many rate limit hits, add an extra delay
      if (rateExceededCount > CIRCUIT_BREAKER_THRESHOLD) {
        console.error(`Too many rate limit hits (${rateExceededCount}). Adding circuit breaker delay of ${CIRCUIT_BREAKER_DELAY}ms.`);
        await new Promise(resolveDelay => setTimeout(resolveDelay, CIRCUIT_BREAKER_DELAY));
        rateExceededCount = Math.max(0, rateExceededCount - 2); // Reduce count but don't reset completely
      }
      
      // Add to queue instead of executing immediately
      operationQueue.push(async () => {
        try {
          await executeRateLimitedOperation(operation);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          pendingOperations--;
          
          // Reset rate exceeded count if we're back to normal levels
          if (pendingOperations <= MAX_CONCURRENT_OPERATIONS) {
            rateExceededCount = Math.max(0, rateExceededCount - 1);
          }
          
          // Remove from tracking map if we were using deduplication
          if (operationKey) {
            pendingOperationMap.delete(operationKey);
          }
        }
      });
      
      // Start processing the queue if it's not already being processed
      if (!isProcessingQueue) {
        processOperationQueue();
      }
    } else {
      try {
        await executeRateLimitedOperation(operation);
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        pendingOperations--;
        
        // Reset rate exceeded count if we're back to normal levels
        if (pendingOperations <= MAX_CONCURRENT_OPERATIONS) {
          rateExceededCount = 0;
        }
        
        // Remove from tracking map if we were using deduplication
        if (operationKey) {
          pendingOperationMap.delete(operationKey);
        }
      }
    }
  });
  
  // Store operation promise for deduplication if key is provided
  if (operationKey) {
    pendingOperationMap.set(operationKey, operationPromise);
  }
  
  return operationPromise;
};

/**
 * Execute an operation with rate limiting applied
 */
const executeRateLimitedOperation = async (operation: () => Promise<void>) => {
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

/**
 * Process queued operations with rate limiting
 */
const processOperationQueue = async () => {
  if (operationQueue.length === 0) {
    isProcessingQueue = false;
    return;
  }
  
  isProcessingQueue = true;
  
  // Take the next operation from the queue
  const nextOperation = operationQueue.shift();
  
  if (nextOperation) {
    try {
      await nextOperation();
    } catch (error) {
      console.error("Error executing queued operation:", error);
    }
    
    // Add a small delay between operations from the queue
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Process the next item if any
    processOperationQueue();
  } else {
    isProcessingQueue = false;
  }
};

/**
 * Recovery mechanism for auth operations
 * Attempts to recover from auth state errors by clearing pending operations
 */
export const recoverAuthState = () => {
  // Clear operation queue
  operationQueue.length = 0;
  
  // Reset counters
  pendingOperations = 0;
  rateExceededCount = 0;
  
  // Clear deduplication map
  pendingOperationMap.clear();
  
  console.info("Auth state recovery executed - operation queue cleared");
  
  // Add additional delay to ensure Supabase has time to stabilize
  return new Promise(resolve => setTimeout(resolve, 2000));
};
