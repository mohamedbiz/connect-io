
/**
 * Simple authentication event logging
 */

export const logAuth = (
  message: string,
  data: any = null,
  warning = false,
  isError = false
): void => {
  const timestamp = new Date().toISOString();
  const prefix = `[Auth ${timestamp}]`;
  
  if (isError) {
    console.error(`${prefix} ERROR: ${message}`, data);
  } else if (warning) {
    console.warn(`${prefix} WARNING: ${message}`, data);
  } else {
    console.log(`${prefix} INFO: ${message}`, data ? data : '');
  }
};
