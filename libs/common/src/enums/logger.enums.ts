/**
 * Enum representing the logger context.
 */
export enum LoggerCtx {
  AJV = 'Ajv',
  DECORATOR = 'Decorator',
  PRISMA = 'Prisma',
  SERVICE = 'Service',
}

/**
 * Enum representing the log level.
 */
export enum LogLevel {
  DEBUG = 'debug',
  ERROR = 'error',
  INFO = 'info',
  TRACE = 'trace',
  WARN = 'warn',
}

/**
 * Enum representing the log client.
 */
export enum LogClient {
  CONSOLE = 'console',
  FILE = 'file',
}
