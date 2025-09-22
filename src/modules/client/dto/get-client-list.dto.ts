import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PageDto, PageOptionDto } from '@lib/common/dto';

import { ClientDto } from './client.dto';
import { SortClientDto } from './sort-client.dto';

/**
 * DTO (Data Transfer Object) representing get client list request.
 */
export class GetClientListRequest extends PageOptionDto {
  /**
   * Optional sorting criteria for clients.
   */
  @ApiPropertyOptional({ type: () => SortClientDto })
  @Type(() => SortClientDto)
  sort?: SortClientDto;
}

/**
 * DTO (Data Transfer Object) representing get client list response.
 */
export class GetClientListResponse extends PageDto<ClientDto> {
  /**
   * Array containing the list of clients.
   */
  @ApiProperty({ type: [ClientDto] })
  data: ClientDto[];
}
