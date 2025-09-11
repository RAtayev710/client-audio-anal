import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Decorator for denoting id property in swagger.
 * @param {boolean} [required] The flag indicating required property.
 */
export const ApiIdProperty = (required = true) =>
  applyDecorators(ApiProperty({ type: String, format: 'uuid', required }));
