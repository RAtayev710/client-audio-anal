import { HttpException } from '@nestjs/common';

import { HttpException as HttpExceptionType } from '@lib/common/types';

/**
 * Utility class for handling exceptions.
 */
export class ExceptionUtil {
  /**
   * Handles unknown error and returns error message.
   * @param {unknown} err The error to handle.
   * @returns {string} Error message
   */
  static handleUnknownError(err: unknown): string {
    if (typeof err === 'object')
      return `Obtained error that is not extended from Error. ${
        err
          ? `Class of error: ${err.constructor.name}. Error: ${JSON.stringify(err)}`
          : `Error is null.`
      }`;
    else
      return `Obtained error that is not object. Error: ${JSON.stringify(err)}`;
  }

  /**
   * Throws an HTTP exception.
   * @param {HttpExceptionType} exception The HTTP exception to throw.
   * @returns {never}
   * @throws {HttpException} Throws an HTTP exception.
   */
  static throwHttpException<T extends HttpExceptionType = HttpExceptionType>({
    statusCode,
    ...exception
  }: T): never {
    throw new HttpException(exception, statusCode);
  }
}
