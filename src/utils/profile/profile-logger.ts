
/**
 * Enhanced logging utility specific to profile management
 */
export const logProfile = (message: string, data?: any, isWarning = false, isError = false) => {
  if (process.env.NODE_ENV !== 'production') {
    const timestamp = new Date().toISOString();
    const logMethod = isError ? console.error : isWarning ? console.warn : console.log;
    logMethod(`${timestamp} ${isWarning ? 'warning:' : isError ? 'error:' : 'info:'} ${message}`, data);
  }
};
