import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassConstructor } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MappingUtil } from '@lib/utils';

import { DTO_KEY } from '../constants';
import { PageMetaDto, ResponseDto } from '../dto';

/**
 * Interceptor for mapping response data to DTOs.
 * @template I - Input data type.
 * @template O - Output DTO type.
 * @template T - Response type including data, itemCount, and pagination.
 */
@Injectable()
export class ResponseToDtoInterceptor<
  I,
  T extends { data: I | I[] } & {
    itemCount?: number;
    pagination?: PaginationCtx;
  },
> implements NestInterceptor<T, ResponseDto | T | unknown>
{
  /**
   * Creates an instance of ResponseToDtoInterceptor.
   * @param {Reflector} reflector - The reflector service.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Intercepts the response to map response data to DTO.
   * @param {ExecutionContext} ctx - The execution context.
   * @param {CallHandler} next - The call handler.
   * @returns {Observable<ResponseDto | T>} The observable with mapped data.
   */
  intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto | T | unknown> {
    return next.handle().pipe(
      map<T, ResponseDto | T | unknown>((input) => {
        if (!input) return input;

        const { data, pagination, itemCount } = input;
        const cls = this.getDto(ctx);

        if (cls) {
          const result = MappingUtil.toDto(data, { cls });

          if (pagination && Array.isArray(result)) {
            const meta = new PageMetaDto(pagination, itemCount ?? 0);

            return new ResponseDto(true, result, meta);
            // Не менять на DTO - отвалится 1С
          } else return result;
        } else return new ResponseDto(true, input);
      }),
    );
  }

  /**
   * Retrieves the DTO class from the execution context.
   * @private
   * @param {ExecutionContext} ctx - The execution context.
   * @returns {ClassConstructor<unknown> | undefined} The DTO class.
   */
  private getDto(ctx: ExecutionContext) {
    return this.reflector.getAllAndOverride<ClassConstructor<unknown>>(
      DTO_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
  }
}
