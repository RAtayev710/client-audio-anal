import { JSONSchema7 } from 'json-schema';

export type JsonSchema = JSONSchema7 & {
  consumes?: string[];
  errorMessage?: { [key: string]: string } | string;
  formatMinimum?: any;
  maximum?: number;
  minimum?: number;
  patternProperties?: {
    [key: string]: JsonSchema;
  };
  properties?: {
    [key: string]: JsonSchema | boolean;
  };
  transform?: string[];
  uniqueItemProperties?: string[];
};

export type JsonSchemaProp = {
  [key: string]: JsonSchema;
};

export type SchemaOption<P = object> = {
  isOptional?: boolean;
} & Pick<
  JsonSchema,
  | 'maxLength'
  | 'minLength'
  | 'minimum'
  | 'maximum'
  | 'format'
  | 'transform'
  | 'errorMessage'
  | 'const'
  | 'pattern'
  | 'enum'
> &
  P;
