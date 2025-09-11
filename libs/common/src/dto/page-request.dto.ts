import { ApiPropertyOptional } from '@nestjs/swagger';

import { LIMIT_ITEM, MAX_LIMIT_ITEM } from '../constants';

/**
 * Class representing request DTO for request with pagination.
 */
export class PageRequestDto {
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
    minimum: -1,
    default: 1,
  })
  readonly page: number = 1;
}
