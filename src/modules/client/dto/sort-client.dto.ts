import { ApiPropertyOptional } from '@nestjs/swagger';

import { OrderBy } from '@lib/common/enums';

/**
 * DTO (Data Transfer Object) representing sort of the get client list request.
 */
export class SortClientDto {
  /**
   * The creation date of the client.
   */
  @ApiPropertyOptional({ enum: OrderBy, name: 'sort[createdAt]' })
  createdAt?: OrderBy;
}
