import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { PageUtil } from '@lib/utils';

import { UNLIMIT_PAGE } from '../../constants';

/**
 * Parameter decorator to get and transform pagination query from the request.
 */
export const PageQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest<FastifyRequest>();
    let page = PageUtil.getPage(query?.['page']);

    if (page === UNLIMIT_PAGE) return { offset: 0, page: 0, limit: undefined };

    const limit = PageUtil.getLimit(query?.['limit']);

    page = Math.max(page, 1);

    return {
      offset: PageUtil.getOffset(page, limit),
      page,
      limit,
    };
  },
);
