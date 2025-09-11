import { Exclude, Expose } from 'class-transformer';

/**
 * Class representing request DTO for pagination.
 */
@Exclude()
export class PageOptionDto implements PaginationCtx {
  /**
   * The page number.
   * @type {number}
   */
  @Expose()
  page: number;

  /**
   * The number of items to skip.
   * @type {number}
   */
  @Expose()
  skip?: number;

  /**
   * The maximum number of items to return per page.
   * @type {number}
   */
  @Expose()
  take?: number;
}
