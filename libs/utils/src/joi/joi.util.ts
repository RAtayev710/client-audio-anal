import joi from 'joi';

import { ConfigToken } from '@lib/common/enums';
import { ConfigProps, JoiConfig } from '@lib/config/types';

/**
 * Utility class for working with Joi validation.
 */
export class JoiUtil {
  /**
   * Get the Joi schema instance.
   * @returns {Joi} The Joi schema instance.
   */
  static get schema() {
    return joi;
  }

  /**
   * Extracts values from the given configuration object by property name.
   * @template T - The type of the configuration object.
   * @template V - The type of the value within the configuration object.
   * @template PN - The type of the property name.
   * @param {JoiConfig<T, V>} config - The configuration object to extract values from.
   * @param {PN} propName - The property name to extract values for.
   * @returns {Record<keyof T, ConfigProps<V>[PN]>} A record of extracted values keyed by property name.
   */
  static extractByPropName<
    T extends object,
    V,
    PN extends keyof ConfigProps<V> = keyof ConfigProps<V>,
  >(
    config: JoiConfig<T, V>,
    propName: PN,
  ): Record<keyof T, ConfigProps<V>[PN]> {
    const result = {} as Record<keyof T, ConfigProps<V>[PN]>;

    for (const [key, value] of Object.entries<ConfigProps<V>>(config)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result[key as keyof T] = value[propName];
    }

    return result;
  }

  /**
   * Validates the given configuration object against the Joi schema.
   * @template T - The type of the configuration object.
   * @template V - The type of the value within the configuration object.
   * @param {ConfigToken} name - The name of the configuration.
   * @param {JoiConfig<T, V>} config - The configuration object to validate.
   * @returns {T} The validated configuration object.
   * @throws {Error} Throws an error if validation fails.
   */
  static validate<T extends object, V>(
    name: ConfigToken,
    config: JoiConfig<T, V>,
  ): T {
    const schemaObj = JoiUtil.extractByPropName<T, V, 'joi'>(config, 'joi');
    const values = JoiUtil.extractByPropName(config, 'value');
    const schema = JoiUtil.schema.object<T, any, T>(schemaObj);

    const { error, ...result } = schema.validate(values, { abortEarly: false });

    if (error) throw new Error(JoiUtil.transformError(name, error));

    return result.value as T;
  }

  /**
   * Transforms a Joi validation error into a human-readable error message.
   * @param {ConfigToken} name - The name of the configuration.
   * @param {joi.ValidationError} error - The Joi validation error.
   * @returns {string} The transformed error message.
   */
  private static transformError(
    name: ConfigToken,
    error: joi.ValidationError,
  ): string {
    const key = error.details[0]?.context?.key || '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = error.details[0]?.context?.value || '';
    const message = error.message;

    if (key)
      return `Wrong "${name}.${key}" variable; Value: "${value}" is invalid. ${message}`;

    return `Validation failed - Is there an environment variable missing? ${message}`;
  }
}
