
/**
 * Central logging system exports
 */
import { createLogger } from './logger-core';
export { logAuth } from '../auth/auth-logger';
export { logProfile } from '../profile/profile-logger';
export { logOAuth } from '../auth/oauth-logger';

// Export the logger factory for creating domain-specific loggers
export { createLogger };

// Create some commonly used loggers
export const apiLogger = createLogger('api');
export const uiLogger = createLogger('ui');
export const routerLogger = createLogger('router');
export const authLogger = createLogger('auth');

// Create a general logging object for backwards compatibility
export const logging = {
  info: (message: string, data?: any) => apiLogger.info(message, data),
  warn: (message: string, data?: any) => apiLogger.warning(message, data),
  error: (message: string, data?: any) => apiLogger.error(message, data),
  debug: (message: string, data?: any) => apiLogger.debug(message, data),
};
