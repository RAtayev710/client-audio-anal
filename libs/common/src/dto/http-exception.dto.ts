import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { HttpException } from '../types';

export class HttpExceptionDto {
  @ApiProperty()
  readonly code: string;

  @ApiPropertyOptional()
  readonly key?: string;

  @ApiProperty()
  readonly message: string;

  constructor(data: Omit<HttpException, 'statusCode'>) {
    this.code = data.code;
    this.message = data.message;
    if (data.key) this.key = data.key;
  }
}
