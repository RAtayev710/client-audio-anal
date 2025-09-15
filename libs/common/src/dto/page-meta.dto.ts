import { ApiProperty } from '@nestjs/swagger';

import { PageOptionDto } from './page-option.dto';

/**
 * Class representing metadata for pagination.
 */
export class PageMetaDto {
  /**
   * Indicates whether there is a next page.
   * @type {boolean}
   */
  @ApiProperty({ example: true })
  readonly hasNextPage: boolean;

  /**
   * Indicates whether there is a previous page.
   * @type {boolean}
   */
  @ApiProperty({ example: false })
  readonly hasPrevPage: boolean;

  /**
   * The total number of items across all pages.
   * @type {number}
   */
  @ApiProperty({ example: 335 })
  readonly itemCount: number;

  /**
   * The maximum number of items per page.
   * @type {number}
   */
  @ApiProperty({ example: 20 })
  readonly limit: number;

  /**
   * The current page number.
   * @type {number}
   */
  @ApiProperty({ example: 1 })
  readonly page: number;

  /**
   * The total number of pages.
   * @type {number}
   */
  @ApiProperty({ example: 17 })
  readonly pageCount: number;

  /**
   * Constructs an instance of PageMetaDto.
   * @constructor
   * @param {PageOptionDto} pageOption - Request options for pagination.
   * @param {number} itemCount - The total number of items.
   */
  constructor(pageOption: PageOptionDto, itemCount: number) {
    this.limit = pageOption.limit || itemCount;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit) || 0;

    this.page = this.transformPage(pageOption);
    this.hasPrevPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }

  /**
   * Transforms the page number based on page options and page count.
   * @private
   * @param {PageOptionDto} pageOption - Request options for pagination.
   * @returns {number} - The transformed page number.
   */
  private transformPage(pageOption: PageOptionDto): number {
    return pageOption?.page > this.pageCount
      ? this.pageCount + 1
      : pageOption.page || 1;
  }
}
