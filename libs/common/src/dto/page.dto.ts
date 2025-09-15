import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from './page-meta.dto';

/**
 * Class representing a paginated response DTO.
 * @template T - Type of the data in the page.
 */
export class PageDto<T> {
  /**
   * Data array containing elements of type T.
   * @type {T[]}
   */
  @ApiProperty({ isArray: true })
  readonly data: T[];

  /**
   * Metadata describing the pagination details.
   * @type {PageMetaDto}
   */
  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  /**
   * Constructs an instance of PageDto.
   * @constructor
   * @param {T[]} data - Array of data elements of type T.
   * @param {PageMetaDto} meta - Pagination metadata.
   */
  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
