
/**
 * Log authentication-related events with consistent formatting
 * @param message The message to log
 * @param data Optional data to include
 * @param level Log level - info, warning, error
 * @param sensitive Whether the log contains sensitive data
 */
export const logAuth = (
  message: string,
  data: any = null,
  level: "info" | "warning" | "error" = "info",
  sensitive = false
): void => {
  const timestamp = new Date().toISOString();
  const logPrefix = sensitive 
    ? `[Auth Service ${timestamp}] SENSITIVE:` 
    : `[Auth Service ${timestamp}]`;
  
  switch (level) {
    case "error":
      console.error(`${logPrefix} ERROR: ${message}`, data);
      break;
    case "warning":
      console.warn(`${logPrefix} WARNING: ${message}`, data);
      break;
    default:
      console.log(`${logPrefix} INFO: ${message}`, data ? data : '');
  }
};
