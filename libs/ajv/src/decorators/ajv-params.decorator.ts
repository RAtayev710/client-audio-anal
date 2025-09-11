import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Parameter decorator to get the request params.
 */
export const AjvParams = createParamDecorator(
  (_schema: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ params: unknown }>();

    return request.params;
  },
);
