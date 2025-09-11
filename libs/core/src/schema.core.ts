import { JsonSchemaProp, SchemaOption } from '@lib/ajv/types';
import { BIG_INT } from '@lib/common/constants';

/**
 * Class representing a validation schema core.
 */
export class SchemaCore {
  /**
   * Creates an instance of SchemaCore.
   * @param {string} [moduleName='common'] - The name of the module.
   */
  constructor(private readonly moduleName: string = 'common') {}

  /**
   * Returns a JSON schema for an array of integers.
   * @protected
   * @param {string} key - The key for the schema.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getArrayInteger(key: string): JsonSchemaProp {
    return {
      [key]: {
        anyOf: [
          {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: { type: 'integer', minimum: 1 },
          },
          { type: 'integer', minimum: 1 },
        ],
      },
    };
  }

  /**
   * Returns a JSON schema for an array of strings.
   * @protected
   * @param {string} key - The key for the schema.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getArrayString(key: string): JsonSchemaProp {
    return {
      [key]: {
        anyOf: [
          {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: { type: 'string' },
          },
          { type: 'string' },
        ],
      },
    };
  }

  /**
   * Returns a JSON schema for an bigint value.
   * @protected
   * @param {string} key - The key for the schema.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getBigInt(key: string): JsonSchemaProp {
    return {
      [key]: { type: 'string' },
    };
  }

  /**
   * Returns a JSON schema for a boolean value.
   * @protected
   * @param {string} key - The key for the schema.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getBoolean(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: 'boolean',
      },
    };
  }

  /**
   * Returns a JSON schema for a date value.
   * @protected
   * @param {string} key - The key for the schema.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getDate(key: string, isOptional: boolean = false): JsonSchemaProp {
    return {
      [key]: {
        type: isOptional ? ['string', 'null'] : 'string',
        format: 'date',
      },
    };
  }

  /**
   * Returns a JSON schema for a date range.
   * @protected
   * @param {string} key - The key for the schema.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getDateRange(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: 'object',
        additionalProperties: false,
        properties: {
          min: {
            type: 'string',
            format: 'date',
          },
          max: {
            type: 'string',
            format: 'date',
            formatMinimum: { $data: '1/min' },
          },
        },
      },
    };
  }

  /**
   * Returns a JSON schema for a datetime value.
   * @protected
   * @param {string} key - The key for the schema.
   * @param {boolean} [nullable=false] - Whether the value can be null.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getDateTime(key: string, nullable = false): JsonSchemaProp {
    return {
      [key]: {
        type: nullable ? ['string', 'null'] : 'string',
        format: 'date-time',
      },
    };
  }

  /**
   * Returns a JSON schema for a decimal value.
   * @protected
   * @param {string} key - The key for the schema.
   * @param {number} [multipleOf=0.001] - The precision of the value.
   * @param {SchemaOption<SchemaOption>} [opt] - Optional schema options.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getDecimal(
    key: string,
    multipleOf: number = 0.001,
    opt?: SchemaOption<SchemaOption>,
  ): JsonSchemaProp {
    const { isOptional, ...param } = { ...opt };

    return {
      [key]: {
        type: isOptional ? ['number', 'null'] : 'number',
        multipleOf,
        ...param,
      },
    };
  }

  /**
   * Returns a JSON schema for an enum value.
   * @protected
   * @param {string} key - The key for the schema.
   * @param {object} [value] - The enum object.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getEnum(key: string, value: object): JsonSchemaProp {
    return {
      [key]: {
        type: 'string',
        enum: Object.values(value) as string[],
      },
    };
  }

  /**
   * Returns a JSON schema for an ID value.
   * @protected
   * @param {string} key - The key for the schema.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getId(key: string): JsonSchemaProp {
    return this.getString(key, { format: 'uuid' });
  }

  /**
   * Returns the key for an ID schema.
   * @protected
   * @param {string} schemaName - The name of the schema.
   * @returns {string} The ID key.
   */
  protected getIdKey(schemaName: string) {
    return `${this.moduleName}/${schemaName}`;
  }

  /**
   * Returns a JSON schema for an integer value.
   * @protected
   * @param {string} key - The key for the schema.
   * @param {number} [minimum=-BIG_INT] - The minimum value.
   * @param {number} [maximum=BIG_INT] - The maximum value.
   * @param {boolean} [isOptional=false]
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getInteger(
    key: string,
    minimum: number = -BIG_INT,
    maximum: number = BIG_INT,
    isOptional: boolean = false,
  ): JsonSchemaProp {
    return {
      [key]: {
        type: isOptional ? ['number', 'null'] : 'integer',
        minimum,
        maximum,
      },
    };
  }

  /**
   * Returns a JSON schema for a integer range.
   * @protected
   * @param {string} key - The key for the schema.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getIntegerRange(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: 'object',
        additionalProperties: false,
        properties: {
          min: { type: 'integer' },
          max: { type: 'integer', minimum: { $data: '1/min' } },
        },
      },
    } as unknown as JsonSchemaProp;
  }

  /**
   * Returns a JSON schema for a string value.
   * @protected
   * @param {string} key - The key for the schema.
   * @param {SchemaOption<SchemaOption>} [opt] - Optional schema options.
   * @returns {JsonSchemaProp} The JSON schema property.
   */
  protected getString(
    key: string,
    opt?: SchemaOption<SchemaOption>,
  ): JsonSchemaProp {
    const { isOptional, ...param } = opt || { isOptional: false };
    const minLength = isOptional ? 0 : (opt?.minLength ?? 1);
    const maxLength = opt?.maxLength;

    return {
      [key]: {
        type: isOptional ? ['string', 'null'] : 'string',
        transform: ['trim'],
        ...param,
        minLength,
        ...(maxLength && { maxLength }),
      },
    };
  }
}
