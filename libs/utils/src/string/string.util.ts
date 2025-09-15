/**
 * Utility class for working with strings.
 */
export class StringUtil {
  /**
   * Converts an empty string to null.
   * @param {string} s - The string to convert.
   * @returns {string | null} The converted string or null.
   */
  static emptyToNull(s: string): string | null {
    return s || null;
  }

  /**
   * Escapes special characters in a string to prevent XSS attacks.
   * @param {string} s - The string to escape.
   * @returns {string} The escaped string.
   */
  static escape(s: string): string {
    return s
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#47;')
      .replace(/\\/g, '&#92;');
  }

  /**
   * Escapes special characters in a string for use in search queries.
   * @param {string} s - The string to escape.
   * @returns {string} The escaped string.
   */
  static escapeSearchQuery(s: string): string {
    return s
      ? s.replace(
          /(\+|\-|\=|&&|\|\||\>|\<|\!|\(|\)|\{|\}|\[|\]|\^|"|~|\*|\?|\:|\\|\/)/g,
          '\\$&',
        )
      : '';
  }

  /**
   * Checks if a value is a number.
   * @param {unknown} val - The value to check.
   * @returns {boolean} True if the value is a number, false otherwise.
   */
  static isNumber(val: unknown): boolean {
    const num =
      val !== '' && typeof val !== 'boolean'
        ? Number(val ?? undefined)
        : undefined;

    return num === 0 || !!num;
  }

  /**
   * Converts a string to a number if possible, otherwise returns 0.
   * @param {string} val - The string to convert.
   * @returns {number} The converted number or 0.
   */
  static transformStringToNumber(val: string): number {
    return StringUtil.isNumber(val) ? Number(val) : 0;
  }
}
