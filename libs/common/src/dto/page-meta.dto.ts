import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing metadata for pagination.
 */
export class PageMetaDto {
  /**
   * The current page number.
   * @type {number}
   */
  @ApiProperty({ example: 1 })
  readonly page: number;

  /**
   * The maximum number of items per page.
   * @type {number}
   */
  @ApiProperty({ example: 20 })
  readonly pageSize: number;

  /**
   * The total number of items across all pages.
   * @type {number}
   */
  @ApiProperty({ example: 335 })
  readonly total: number;

  /**
   * Constructs an instance of PageMetaDto.
   * @constructor
   * @param {PaginationCtx} pageOption - Request options for pagination.
   * @param {number} total - The total number of items.
   */
  constructor(pageOption: PaginationCtx, total: number) {
    this.pageSize = pageOption.take || total;
    this.total = total;

    this.page = this.transformPage(pageOption);
  }

  /**
   * Transforms the page number based on page options and page count.
   * @private
   * @param {PaginationCtx} pageOption - Request options for pagination.
   * @returns {number} - The transformed page number.
   */
  private transformPage(pageOption: PaginationCtx): number {
    const pageCount = Math.ceil(this.total / this.pageSize) || 0;

    return pageOption?.page > pageCount ? pageCount + 1 : pageOption.page || 1;
  }
}
