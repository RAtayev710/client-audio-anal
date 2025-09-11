import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import ms from 'ms';

dayjs.extend(CustomParseFormat);
dayjs.extend(utc);

/**
 * Utility class for date manipulation.
 */
export class DateUtil {
  /**
   * Adds specified number of days to the given date.
   * @param {DateCtx} [date] - The base date. If not provided, the current date is used.
   * @param {number} [amount] - The number of days to add. If not provided, 0 is assumed.
   * @returns {Date} The new date after adding the specified number of days.
   */
  static addDays(date?: DateCtx, amount?: number): Date {
    return dayjs(date)
      .add(amount || 0, 'days')
      .toDate();
  }

  /**
   * Adds specified number of milliseconds to the given date.
   * @param {DateCtx} [date] - The base date. If not provided, the current date is used.
   * @param {number} [amount] - The number of milliseconds to add. If not provided, 0 is assumed.
   * @returns {Date} The new date after adding the specified number of days.
   */
  static addMilliseconds(date?: DateCtx, amount?: number): Date {
    return dayjs(date)
      .add(amount || 0, 'milliseconds')
      .toDate();
  }

  /**
   * Adds specified number of minutes to the given date.
   * @param {DateCtx} [date] - The base date. If not provided, the current date is used.
   * @param {number} [amount] - The number of minutes to add. If not provided, 0 is assumed.
   * @returns {Date} The new date after adding the specified number of days.
   */
  static addMinutes(date?: DateCtx, amount?: number): Date {
    return dayjs(date)
      .add(amount || 0, 'minutes')
      .toDate();
  }

  /**
   * Adds specified number of months to the given date.
   * @param {DateCtx} [date] - The base date. If not provided, the current date is used.
   * @param {number} [amount] - The number of months to add. If not provided, 0 is assumed.
   * @returns {Date} The new date after adding the specified number of days.
   */
  static addMonths(date?: DateCtx, amount?: number): Date {
    return dayjs(date)
      .add(amount || 0, 'month')
      .toDate();
  }

  /**
   * Adds specified number of seconds to the given date.
   * @param {DateCtx} [date] - The base date. If not provided, the current date is used.
   * @param {number} [amount] - The number of seconds to add. If not provided, 0 is assumed.
   * @returns {Date} The new date after adding the specified number of days.
   */
  static addSeconds(date?: DateCtx, amount?: number): Date {
    return dayjs(date)
      .add(amount || 0, 'seconds')
      .toDate();
  }

  static diff(from?: DateCtx, to?: DateCtx): number {
    return dayjs(to).diff(from, 'seconds');
  }

  /**
   * Formats given date according to given format.
   * @param {DateCtx} [date] - The date. If not provided, the current date is used.
   * @param {string} [format='YYYY-MM-DDTHH:mm:ssZ[Z]'] - The format. If not provided, default ISO8601 format is used.
   * @returns {string} Returns formatted datetime string.
   */
  static format(
    date?: DateCtx,
    format: string = 'YYYY-MM-DDTHH:mm:ssZ[Z]',
  ): string {
    return dayjs(date).format(format);
  }

  /**
   * Checks if two dates are the same.
   * @param {DateCtx} [date] - The first date.
   * @param {DateCtx} [other] - The second date.
   * @returns {boolean} Returns true if the two dates are the same, false otherwise.
   */
  static isSame(date?: DateCtx, other?: DateCtx): boolean {
    return dayjs(date).isSame(other);
  }

  /**
   * Parses given date according to given format.
   * @param {DateCtx} [date] - The date. If not provided, the current date is used.
   * @param {string} [format='YYYY-MM-DDTHH:mm:ssZ[Z]'] - The format. If not provided, default ISO8601 format is used.
   * @returns {string} Returns parsed datetime string.
   */
  static parse(
    date?: DateCtx,
    format: string = 'YYYY-MM-DDTHH:mm:ssZ[Z]',
    utc: boolean = false,
  ): Date {
    return utc
      ? dayjs.utc(date, format).toDate()
      : dayjs(date, format).toDate();
  }

  /**
   * Converts the given date to a JavaScript Date object.
   * @param {DateCtx} [date] - The date to convert. If not provided, the current date is used.
   * @returns {Date} The JavaScript Date object representing the given date.
   */
  static toDate(date?: DateCtx): Date {
    return dayjs(date).toDate();
  }

  /**
   * Converts the specified duration string to milliseconds.
   * @param {string} date - The duration string to convert.
   * @returns {number} The number of milliseconds represented by the duration string.
   */
  static toMs(date: string): number {
    return ms(date);
  }

  /**
   * Converts the given date to UNIX timestamp (seconds since the Unix Epoch).
   * @param {DateCtx} [date] - The date to convert. If not provided, the current date is used.
   * @returns {number} The UNIX timestamp representing the given date.
   */
  static toUnix(date?: DateCtx): number {
    return dayjs(date).unix();
  }
}
