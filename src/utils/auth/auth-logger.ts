
/**
 * Auth logging utility with enhanced features
 */
import { LogLevel, LogContext, createLogger } from '../logging/logger-core';

// Create a specialized logger for auth operations
const authLogger = createLogger('auth');

/**
 * Enhanced logging function for authentication operations
 * @param message - The message to log
 * @param data - Optional data to include with the log
 * @param level - Log level (info, warning, error)
 * @param context - Optional contextual information
 */
export const logAuth = (
  message: string, 
  data?: any, 
  level: LogLevel = 'info',
  context?: LogContext
): void => {
  // Use the appropriate log method based on the level
  switch (level) {
    case 'debug':
      authLogger.debug(message, data, context);
      break;
    case 'warning':
      authLogger.warning(message, data, context);
      break;
    case 'error':
      authLogger.error(message, data, context);
      break;
    case 'info':
    default:
      authLogger.info(message, data, context);
      break;
  }
};
