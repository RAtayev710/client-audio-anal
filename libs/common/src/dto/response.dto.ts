import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { HttpException } from '../types';

import { HttpExceptionDto } from './http-exception.dto';
import { PageMetaDto } from './page-meta.dto';

export class ResponseDataDto<T> {
  /**
   * Object describing the pagination details.
   * @type {PageMetaDto}
   */
  @ApiPropertyOptional({ type: PageMetaDto })
  readonly pagination?: PageMetaDto;

  /**
   * Object containing the response data.
   * @type {T}
   */
  // @ApiProperty()
  readonly data: T;

  /**
   * Constructs an instance of ResponseDto.
   * @constructor
   * @param {T} data - Object containing the response data.
   * @param {PageMetaDto} [pagination] - Pagination metadata.
   */
  constructor(data: T, pagination?: PageMetaDto) {
    this.data = data;
    if (pagination) this.pagination = pagination;
  }
}

/**
 * Class representing a paginated response DTO.
 * @template T - Type of the data in the response.
 */
export class ResponseDto<T = unknown> {
  /**
   * Array of errors.
   * @type {HttpExceptionDto[]}
   */
  @ApiPropertyOptional({ type: [HttpExceptionDto] })
  readonly errors?: HttpExceptionDto[];

  /**
   * Flag indicating whether the response is successful.
   * @type {boolean}
   */
  @ApiProperty()
  readonly success: boolean;

  /**
   * Object containing the response data.
   * @type {ResponseDataDto<T>}
   */
  // @ApiProperty({ type: ResponseDataDto<T> })
  readonly response: ResponseDataDto<T>;

  /**
   * Constructs an instance of ResponseDto.
   * @constructor
   * @param {boolean} success - Flag indicating whether the response is successful.
   * @param {T} data - Object containing the response data.
   * @param {PageMetaDto} [pagination] - Pagination metadata.
   * @param {Omit<HttpException, 'statusCode'>[]} [errors] - Array of errors.
   */
  constructor(
    success: boolean,
    data: T,
    pagination?: PageMetaDto,
    errors?: Omit<HttpException, 'statusCode'>[],
  ) {
    this.success = success;
    this.response = new ResponseDataDto(data, pagination);
    if (errors) this.errors = errors.map((err) => new HttpExceptionDto(err));
  }
}
