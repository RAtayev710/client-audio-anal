import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { FastifyReply } from 'fastify';

import { ResponseDto } from '../dto';
import { HttpException as HttpExceptionType } from '../types';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    const exceptionResponse = exception.getResponse();
    const status = exception.getStatus();

    const errors: Omit<HttpExceptionType, 'statusCode'>[] = [];

    if (typeof exceptionResponse === 'string')
      errors.push({ code: 'UNKNOWN', message: exceptionResponse });
    else if (exceptionResponse) {
      if ('code' in exceptionResponse && 'message' in exceptionResponse)
        errors.push(exceptionResponse as Omit<HttpExceptionType, 'statusCode'>);
      else if (
        'errors' in exceptionResponse &&
        Array.isArray(exceptionResponse['errors'])
      )
        errors.push(
          ...(exceptionResponse['errors'] as Omit<
            HttpExceptionType,
            'statusCode'
          >[]),
        );
      else errors.push({ code: HttpStatus[status], message: '' });
    } else errors.push({ code: HttpStatus[status], message: '' });

    response.status(status).send(new ResponseDto(false, {}, undefined, errors));
  }
}
