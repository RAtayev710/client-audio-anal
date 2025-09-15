import { JsonSchema } from '@lib/ajv/types';
import { SchemaCore } from '@lib/core';

/**
 * Schema for call related operations.
 */
class CallSchema extends SchemaCore {
  /**
   * Constructs an instance of CallSchema.
   * @constructor
   */
  constructor() {
    super(CallSchema.name);
  }

  /**
   * Generates the JSON schema for creating the call.
   * @returns {JsonSchema} The JSON schema for creating the call.
   */
  create(): JsonSchema {
    return {
      $id: this.getIdKey('create'),
      type: 'object',
      // additionalProperties: false,
      properties: {
        ...this.getInteger('call_info_id'),
        ...this.getString('client_phone'),
        ...this.getDateTime('call_date'),
        ...this.getString('call_type'),
        ...this.getInteger('call_duration'),
        ...this.getString('manager_name', { isOptional: true }),
        ...this.getString('manager_phone', { isOptional: true }),
        ...this.getInteger('org_id'),
      },
      required: [
        'call_info_id',
        'client_phone',
        'call_date',
        'call_type',
        'call_duration',
        'org_id',
      ],
    };
  }
}

/**
 * Instance of CallSchema used for call schema operations.
 */
export const callSchema = new CallSchema();
