
/**
 * OAuth specific logging
 */

export const logOAuth = (
  message: string,
  data: any = null,
  warning = false,
  isError = false
): void => {
  const timestamp = new Date().toISOString();
  const prefix = `[OAuth ${timestamp}]`;
  
  if (isError) {
    console.error(`${prefix} ERROR: ${message}`, data);
  } else if (warning) {
    console.warn(`${prefix} WARNING: ${message}`, data);
  } else {
    console.log(`${prefix} INFO: ${message}`, data ? data : '');
  }
};
