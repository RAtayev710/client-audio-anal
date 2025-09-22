import { ApiPropertyOptional } from '@nestjs/swagger';

import { OrderBy } from '@lib/common/enums';

/**
 * DTO (Data Transfer Object) representing sort of the get call list request.
 */
export class SortCallDto {
  /**
   * The creation date of the call.
   */
  @ApiPropertyOptional({ enum: OrderBy, name: 'sort[datetime]' })
  datetime?: OrderBy;
}
