import { ApiPropertyOptional } from '@nestjs/swagger';

import { LIMIT_ITEM, MAX_LIMIT_ITEM } from '../constants';

/**
 * Class representing request DTO for pagination.
 */
export class PageOptionDto implements PaginationCtx {
  /**
   * The maximum number of items to return per page.
   * @type {number}
   */
  @ApiPropertyOptional({
    minimum: 1,
    maximum: MAX_LIMIT_ITEM,
    default: LIMIT_ITEM,
  })
  readonly limit: number = LIMIT_ITEM;

  /**
   * The page number.
   * @type {number}
   */
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  readonly page: number = 1;

  /**
   * Calculates the offset based on the page and limit.
   * @returns {number} - The calculated offset.
   */
  get offset(): number {
    return ((this.page || 1) - 1) * (this.limit || LIMIT_ITEM);
  }
}
