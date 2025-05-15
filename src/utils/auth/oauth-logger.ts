
/**
 * OAuth specific logging utility
 */
import { LogContext, createLogger } from '../logging/logger-core';

// Create a specialized logger for OAuth operations
const oauthLogger = createLogger('oauth');

/**
 * Enhanced logging function for OAuth operations
 * @param message - The message to log
 * @param data - Optional data to include with the log
 * @param isWarning - Whether this is a warning message
 * @param isError - Whether this is an error message
 * @param context - Optional contextual information
 */
export const logOAuth = (
  message: string, 
  data?: any, 
  isWarning = false, 
  isError = false,
  context?: LogContext
): void => {
  if (isError) {
    oauthLogger.error(message, data, context);
  } else if (isWarning) {
    oauthLogger.warning(message, data, context);
  } else {
    oauthLogger.info(message, data, context);
  }
};
