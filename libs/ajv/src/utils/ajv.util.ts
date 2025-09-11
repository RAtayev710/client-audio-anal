import { ErrorObject } from 'ajv';
import localize from 'ajv-i18n';

import { ValidationErrorMessage } from '../types';

export class AjvUtil {
  static transformErrors(
    rawErrors: ErrorObject<string, Record<string, any>, unknown>[],
  ): ValidationErrorMessage[] {
    // Skip custom errors from localization
    localize.ru(rawErrors.filter((err) => err.keyword !== 'errorMessage'));

    const errors: ValidationErrorMessage[] = [];
    const len = rawErrors.length;

    for (const err of rawErrors) {
      let name =
        (err.params.missingProperty as string) ||
        (err.params.additionalProperty as string) ||
        '';

      if (name) name = `/${name}`;

      const fullName = `${err.instancePath}${name}`.slice(1);

      if (fullName || (len === 1 && err.keyword === 'errorMessage'))
        errors.push({
          code: 'ERR_VALIDATION',
          key: fullName || 'data',
          message: err.message,
        });
    }

    return errors;
  }
}
