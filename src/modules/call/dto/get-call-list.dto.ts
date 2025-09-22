import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PageDto, PageOptionDto } from '@lib/common/dto';

import { CallDto } from './call.dto';
import { SortCallDto } from './sort-call.dto';

/**
 * DTO (Data Transfer Object) representing get call list request.
 */
export class GetCallListRequest extends PageOptionDto {
  /**
   * Optional sorting criteria for calls.
   */
  @ApiPropertyOptional({ type: () => SortCallDto })
  @Type(() => SortCallDto)
  sort?: SortCallDto;
}

/**
 * DTO (Data Transfer Object) representing get call list response.
 */
export class GetCallListResponse extends PageDto<CallDto> {
  /**
   * Array containing the list of calls.
   */
  @ApiProperty({ type: [CallDto] })
  data: CallDto[];
}
