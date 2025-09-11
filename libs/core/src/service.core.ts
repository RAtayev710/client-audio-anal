import { Inject, Logger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { LoggerCtx } from '@lib/common/enums/logger.enums';
import { ExceptionUtil } from '@lib/utils';
import { LogUtil } from '@lib/utils/log/log.util';

/**
 * Base class for service classes.
 * Provides common functionality for error handling and logging.
 */
export class ServiceCore {
  /**
   * CLS instance for the service.
   */
  @Inject()
  protected readonly cls: ClsService;

  /**
   * Logger instance for the service.
   */
  protected readonly logger = new Logger(LoggerCtx.SERVICE);

  /**
   * Handles errors that occur during service operations.
   * Logs error details along with additional metadata.
   * @param {unknown} err The error object or value.
   * @param {string} propertyKey The name of the property or method where the error occurred.
   * @param {Record<string, unknown>} [meta] Additional metadata to include in the log.
   */
  protected handleError(
    err: unknown,
    propertyKey: string,
    meta?: Record<string, unknown>,
  ) {
    if (err instanceof Error)
      this.logger.error(
        LogUtil.buildStructuredLog(
          this.constructor.name,
          propertyKey,
          err.message,
          meta,
        ),
        err.stack,
      );
    else
      this.logger.fatal(
        LogUtil.buildStructuredLog(
          this.constructor.name,
          propertyKey,
          ExceptionUtil.handleUnknownError(err),
          meta,
        ),
      );
  }
}
