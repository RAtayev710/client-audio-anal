import { BIG_INT, LIMIT_ITEM, MAX_LIMIT_ITEM } from '@lib/common/constants';

import { StringUtil } from '../string';

/**
 * Utility class for handling pagination-related operations.
 */
export class PageUtil {
  /**
   * Gets the limit value for pagination.
   * If `limit` is not provided or not a positive number, returns the default limit value.
   * @param {unknown} limit - The limit value to use for pagination.
   * @returns {number} The limit value for pagination.
   */
  static getLimit(limit?: unknown): number {
    const queryLimit =
      StringUtil.isNumber(limit) && Number(limit) > 0
        ? Number(limit)
        : LIMIT_ITEM;

    return queryLimit > MAX_LIMIT_ITEM ? MAX_LIMIT_ITEM : queryLimit;
  }

  /**
   * Calculates the offset value for pagination based on the current page and limit.
   * @param {number} page - The current page number.
   * @param {number} limit - The limit value for pagination.
   * @returns {number} The offset value for pagination.
   */
  static getOffset(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return offset > BIG_INT ? BIG_INT : offset;
  }

  /**
   * Gets the current page number for pagination.
   * If `page` is not provided or not a number, returns 1.
   * @param {unknown} page - The current page number.
   * @returns {number} The current page number for pagination.
   */
  static getPage(page?: unknown): number {
    return (StringUtil.isNumber(page) && Number(page)) || 1;
  }
}
