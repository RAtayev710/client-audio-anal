import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Parameter decorator to get the request body.
 */
export const AjvBody = createParamDecorator(
  (_schema: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ body: unknown }>();

    return request.body;
  },
);
