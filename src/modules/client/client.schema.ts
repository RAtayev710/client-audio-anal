import { JsonSchema } from '@lib/ajv/types';
import { PAGE_UNLIMIT_ITEM_SCHEMA } from '@lib/common/schemas';
import { SchemaCore } from '@lib/core';

/**
 * Schema for client related operations.
 */
class ClientSchema extends SchemaCore {
  /**
   * Constructs an instance of ClientSchema.
   * @constructor
   */
  constructor() {
    super(ClientSchema.name);
  }

  /**
   * Generates the JSON schema for getting leasing contract list.
   * @returns {JsonSchema} The JSON schema for getting leasing contract list.
   */
  getList(): JsonSchema {
    return {
      $id: this.getIdKey('getList'),
      type: 'object',
      // additionalProperties: false,
      properties: {
        ...PAGE_UNLIMIT_ITEM_SCHEMA,
        // filter: {
        //   type: 'object',
        //   additionalProperties: false,
        //   properties: {},
        // },
        sort: {
          type: 'object',
          // additionalProperties: false,
          properties: {
            ...this.getSortBy('createdAt'),
          },
        },
      },
    };
  }

  /**
   * Generates the JSON schema for getting the leasing contract by ID.
   * @returns {JsonSchema} The JSON schema for getting the leasing contract by ID.
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
 * Instance of ClientSchema used for client schema operations.
 */
export const clientSchema = new ClientSchema();
