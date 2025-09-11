import { Format, KeywordDefinition } from 'ajv';

import { HttpException } from '@lib/common/types';

export type AjvValidationPipeOptions = {
  context?: string;
  formats?: Record<string, Format>;
  keywords?: (string | KeywordDefinition)[];
};

export type ValidationErrorMessage = Omit<HttpException, 'statusCode'>;
