import {
  ArgumentMetadata,
  Injectable,
  InternalServerErrorException,
  Logger,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import Ajv, { Format, KeywordDefinition, ValidateFunction } from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';

import { ExceptionUtil, LogUtil } from '@lib/utils';

import { AjvValidationPipeOptions, JsonSchema } from './types';
import { AjvUtil } from './utils';

/**
 * Pipe for validating data against JSON schemas using AJV.
 * @template T The type of the JSON schema to validate against.
 */
@Injectable()
export class AjvValidationPipe<T extends JsonSchema = JsonSchema>
  implements PipeTransform
{
  /** The AJV instance used for validation. */
  private readonly ajv: Ajv;

  /** The logger instance. */
  private readonly logger: Logger;

  /**
   * Creates an instance of AjvValidationPipe.
   * @param {AjvValidationPipeOptions} [options] Options for configuring the pipe.
   */
  constructor(options?: AjvValidationPipeOptions) {
    this.ajv = new Ajv({ $data: true, allErrors: true, coerceTypes: true });
    this.logger = new Logger(options?.context || AjvValidationPipe.name);

    addFormats(this.ajv);
    addErrors(this.ajv);
    addKeywords(this.ajv, ['transform', 'uniqueItemProperties']);

    if (options?.formats) this.registerFormats(options.formats);
    if (options?.keywords) this.registerKeywords(options.keywords);
  }

  /**
   * Transforms the input data by validating it against the provided schema.
   * @template I The type of the input data.
   * @param {I} input The input data to be validated.
   * @param {ArgumentMetadata} metadata The metadata associated with the input data.
   * @returns {I} The validated input data.
   * @throws {UnprocessableEntityException} Thrown if validation fails.
   * @throws {InternalServerErrorException} Thrown if an unexpected error occurs during validation.
   */
  transform<I>(input: I, metadata: ArgumentMetadata): I {
    try {
      if (!metadata.data) return input;

      const schema = metadata.data as unknown as T;
      const validate = this.getValidateFunction(schema);

      const isValid = validate(input);

      if (!isValid && validate.errors)
        throw new UnprocessableEntityException({
          errors: AjvUtil.transformErrors(validate.errors),
        });

      return input;
    } catch (err: unknown) {
      if (err instanceof UnprocessableEntityException) throw err;

      if (err instanceof Error)
        this.logger.error(
          LogUtil.buildStructuredLog(
            this.constructor.name,
            'transform',
            err.message,
          ),
          err.stack,
        );
      else
        this.logger.fatal(
          LogUtil.buildStructuredLog(
            this.constructor.name,
            'transform',
            ExceptionUtil.handleUnknownError(err),
          ),
        );

      throw new InternalServerErrorException();
    }
  }

  /**
   * Retrieves a validator function for the given schema.
   * @param {T} schema The JSON schema.
   * @returns {Ajv.ValidateFunction} The validator function.
   */
  private getValidateFunction(schema: T): ValidateFunction {
    return (
      (schema.$id && this.ajv.getSchema(schema.$id)) || this.ajv.compile(schema)
    );
  }

  /**
   * Registers custom formats with the AJV instance.
   * @param {Record<string, Ajv.Format>} formats The custom formats to register.
   */
  private registerFormats(formats: Record<string, Format>) {
    for (const key in formats) this.ajv.addFormat(key, formats[key]);
  }

  /**
   * Registers custom keywords with the AJV instance.
   * @param {(string | KeywordDefinition)[]} keywords The custom keywords to register.
   */
  private registerKeywords(keywords: (string | KeywordDefinition)[]) {
    keywords.forEach((el) => this.ajv.addKeyword(el));
  }
}
