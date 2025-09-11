import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';

import { ResponseDto } from '../dto';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    // let message = exception.message.replace(/\n/g, '');
    let message = 'Что-то пошло не так.';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'Prisma.PrismaClientValidationError';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      code = exception.code;

      switch (exception.code) {
        case 'P2001':
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Not Found';
          break;

        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Conflict';
          break;

        default: {
          status = HttpStatus.SERVICE_UNAVAILABLE;
          message = 'Сервис недоступен.';
        }
      }
    }

    response
      .status(status)
      .send(new ResponseDto(false, {}, undefined, [{ code, message }]));
  }
}
