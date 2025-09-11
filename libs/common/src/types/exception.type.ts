import { HttpStatus } from '@nestjs/common';

export type HttpException = {
  code: string;
  key?: string;
  message: string;
  statusCode: HttpStatus;
};
