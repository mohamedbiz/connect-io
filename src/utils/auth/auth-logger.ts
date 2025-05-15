
/**
 * Auth logging utility for development environments
 */

type LogLevel = 'info' | 'warning' | 'error';

/**
 * Enhanced logging function that only logs in development mode
 */
export const logAuth = (message: string, data?: any, level: LogLevel = 'info') => {
  if (process.env.NODE_ENV !== 'production') {
    const timestamp = new Date().toISOString();
    const isWarning = level === 'warning';
    const isError = level === 'error';
    const logMethod = isError ? console.error : isWarning ? console.warn : console.log;
    
    logMethod(`${timestamp} ${level}: ${message}`, data);
  }
};
