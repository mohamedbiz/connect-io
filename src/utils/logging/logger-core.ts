
/**
 * Core logging functionality shared across the application
 */

export type LogLevel = 'debug' | 'info' | 'warning' | 'error';
export type LogContext = Record<string, any>;

interface LogOptions {
  context?: LogContext;
  timestamp?: boolean;
  includeContext?: boolean;
  module?: string;
}

/**
 * Creates a formatted log message with consistent structure
 */
export function createLogMessage(
  level: LogLevel,
  message: string,
  data?: any,
  options: LogOptions = {}
): { formattedMessage: string; consoleArgs: any[] } {
  const timestamp = options.timestamp !== false ? new Date().toISOString() : '';
  const module = options.module ? `[${options.module}]` : '';
  const levelFormatted = level.toUpperCase().padEnd(7);
  
  // Format the base message
  let formattedMessage = `${timestamp} ${levelFormatted} ${module} ${message}`;
  const consoleArgs: any[] = [];
  
  // Add contextual data if provided
  if (options.context && options.includeContext !== false && Object.keys(options.context).length > 0) {
    formattedMessage += ' %o';
    consoleArgs.push(options.context);
  }
  
  // Add data if provided
  if (data !== undefined) {
    consoleArgs.push(data);
  }
  
  return { formattedMessage, consoleArgs };
}

/**
 * Determines whether a message should be logged based on environment and level
 */
export function shouldLog(level: LogLevel, env?: string): boolean {
  const currentEnv = env || process.env.NODE_ENV || 'development';
  
  // In production, only log warnings and errors by default
  if (currentEnv === 'production') {
    return level === 'warning' || level === 'error';
  }
  
  return true;
}

/**
 * Gets the appropriate console method based on log level
 */
export function getLogMethod(level: LogLevel): (message?: any, ...optionalParams: any[]) => void {
  switch (level) {
    case 'debug':
      return console.debug;
    case 'warning':
      return console.warn;
    case 'error':
      return console.error;
    case 'info':
    default:
      return console.log;
  }
}

/**
 * Creates a logger instance for a specific module
 */
export function createLogger(module: string) {
  return {
    debug: (message: string, data?: any, context?: LogContext) => logMessage('debug', message, data, { module, context }),
    info: (message: string, data?: any, context?: LogContext) => logMessage('info', message, data, { module, context }),
    warning: (message: string, data?: any, context?: LogContext) => logMessage('warning', message, data, { module, context }),
    error: (message: string, data?: any, context?: LogContext) => logMessage('error', message, data, { module, context })
  };
}

/**
 * Core logging function with enhanced features
 */
export function logMessage(
  level: LogLevel,
  message: string,
  data?: any, 
  options: LogOptions = {}
): void {
  if (!shouldLog(level)) {
    return;
  }
  
  const { formattedMessage, consoleArgs } = createLogMessage(level, message, undefined, options);
  const logMethod = getLogMethod(level);
  
  if (consoleArgs.length > 0) {
    logMethod(formattedMessage, ...consoleArgs);
    if (data !== undefined) {
      logMethod(data);
    }
  } else {
    logMethod(formattedMessage);
    if (data !== undefined) {
      logMethod(data);
    }
  }
}
