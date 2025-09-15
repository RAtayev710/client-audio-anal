import { JsonSchemaProp } from '@lib/ajv/types';

import {
  BIG_INT,
  MAX_LIMIT_ITEM,
  MIN_LIMIT_ITEM,
  MIN_PAGE,
  UNLIMIT_PAGE,
} from '../constants';

/**
 * Schema to validate pagination query using ajv.
 */
export const PAGE_UNLIMIT_ITEM_SCHEMA: JsonSchemaProp = {
  limit: {
    type: 'integer',
    minimum: MIN_LIMIT_ITEM,
    maximum: MAX_LIMIT_ITEM,
  },
  page: {
    oneOf: [
      {
        type: 'integer',
        format: 'int64',
        minimum: MIN_PAGE,
        maximum: BIG_INT,
      },
      {
        type: 'integer',
        format: 'int64',
        const: UNLIMIT_PAGE,
      },
    ],
  },
};
