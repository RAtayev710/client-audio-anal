/**
 * Utility class for log manipulation
 */
export class LogUtil {
  /**
   * Builds a structured log message.
   * @param {string} className - The name of the class emitting the log message.
   * @param {string} property - The name of the property or method emitting the log message.
   * @param {string} message - The log message.
   * @param {Record<string, unknown>} [context] - Additional context to include in the log message.
   * @returns {Record<string, unknown>} The structured log object.
   */
  static buildStructuredLog(
    className: string,
    property: string,
    message: string,
    context?: Record<string, unknown>,
  ): Record<string, unknown> {
    return { message, className, property, ...context };
  }
}
