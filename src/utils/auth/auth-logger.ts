
import { logging } from "@/utils/logging";

// Define allowed log levels
type LogLevel = "info" | "warn" | "error" | "debug";

/**
 * Log authentication related events
 * @param message The main log message
 * @param data Additional data to log (optional)
 * @param level Log level (default: info)
 * @param includeStackTrace Whether to include stack trace (default: false)
 */
export function logAuth(
  message: string,
  data: any = null,
  level: LogLevel = "info",
  includeStackTrace = false
): void {
  const logFn = logging[level] || logging.info;
  
  if (includeStackTrace) {
    // Create an error to capture stack trace
    const err = new Error();
    logFn(`[Auth] ${message}`, {
      ...(data ? { data } : {}),
      stack: err.stack?.split('\n').slice(2).join('\n') // Remove the first two lines which are this function
    });
  } else {
    logFn(`[Auth] ${message}`, data);
  }
}
