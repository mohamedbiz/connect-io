
/**
 * Log profile-related messages with consistent formatting
 * @param message The message to log
 * @param data Optional data to include
 * @param warning Whether to log as a warning
 * @param isError Whether to log as an error
 */
export const logProfile = (
  message: string,
  data: any = null,
  warning = false,
  isError = false
): void => {
  const timestamp = new Date().toISOString();
  const logPrefix = `[Profile Service ${timestamp}]`;
  
  if (isError) {
    console.error(`${logPrefix} ERROR: ${message}`, data);
  } else if (warning) {
    console.warn(`${logPrefix} WARNING: ${message}`, data);
  } else {
    console.log(`${logPrefix} INFO: ${message}`, data ? data : '');
  }
};
