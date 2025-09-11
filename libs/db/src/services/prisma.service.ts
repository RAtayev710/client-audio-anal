import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { LoggerCtx } from '@lib/common/enums';
import { ExceptionUtil } from '@lib/utils';
import { LogUtil } from '@lib/utils/log';

@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Logger instance for logging messages within the subscriber.
   * @private
   * @readonly
   */
  private readonly logger = new Logger(LoggerCtx.PRISMA);

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err: unknown) {
      this.handleError(err, 'onModuleInit');

      throw err;
    }
  }

  withExtensions() {
    return this.$extends({});
  }

  /**
   * Handles errors that occur during event handling.
   * @private
   * @param {unknown} err - The error object.
   * @param {string} propertyKey - The name of the method where the error occurred.
   * @param {Record<string, unknown>} meta - Additional metadata.
   * @returns {void}
   */
  private handleError(
    err: unknown,
    propertyKey: string,
    meta?: Record<string, unknown>,
  ): void {
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
