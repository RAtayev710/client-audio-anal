import { JsonSchema } from '@lib/ajv/types';
import { PAGE_UNLIMIT_ITEM_SCHEMA } from '@lib/common/schemas';
import { SchemaCore } from '@lib/core';

import { MAX_AUTH_TOKEN_NAME_LENGTH } from './auth-token.constants';

/**
 * Schema for auth token related operations.
 */
class AuthTokenSchema extends SchemaCore {
  /**
   * Constructs an instance of AuthTokenSchema.
   * @constructor
   */
  constructor() {
    super(AuthTokenSchema.name);
  }

  /**
   * Generates the JSON schema for creating the auth token.
   * @returns {JsonSchema} The JSON schema for creating the auth token.
   */
  create(): JsonSchema {
    return {
      $id: this.getIdKey('create'),
      type: 'object',
      additionalProperties: false,
      properties: {
        ...this.getString('name', {
          maxLength: MAX_AUTH_TOKEN_NAME_LENGTH,
        }),
        orgs: {
          type: 'array',
          minItems: 1,
          uniqueItems: true,
          items: { type: 'integer', minimum: 1 },
        },
      },
      required: ['name', 'orgs'],
    };
  }

  /**
   * Generates the JSON schema for getting auth token list.
   * @returns {JsonSchema} The JSON schema for getting auth token list.
   */
  getList(): JsonSchema {
    return {
      $id: this.getIdKey('getList'),
      type: 'object',
      additionalProperties: false,
      properties: { ...PAGE_UNLIMIT_ITEM_SCHEMA },
    };
  }

  /**
   * Generates the JSON schema for getting the auth token by ID.
   * @returns {JsonSchema} The JSON schema for getting the auth token by ID.
   */
  getOne(): JsonSchema {
    return {
      $id: this.getIdKey('getOne'),
      type: 'object',
      required: ['id'],
      additionalProperties: false,
      properties: this.getId('id'),
    };
  }
}

/**
 * Instance of AuthTokenSchema used for auth token schema operations.
 */
export const authTokenSchema = new AuthTokenSchema();
