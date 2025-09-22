import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

/**
 * Parameter decorator to get current org id from the request.
 */
export const CurrentOrgId = createParamDecorator<
  unknown,
  ExecutionContext,
  number | undefined
>((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<FastifyRequest>();

  return req?.auth?.orgId;
});
