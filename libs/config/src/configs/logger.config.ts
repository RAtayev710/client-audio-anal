import { registerAs } from '@nestjs/config';

import { ConfigToken, LogClient, LogLevel } from '@lib/common/enums';
import { JoiUtil } from '@lib/utils';

import { JoiConfig, LoggerConfigType } from '../types';

/**
 * Logger configuration constant.
 * @constant {LoggerConfig}
 * @returns {LoggerConfigType} The logger configuration object.
 */
export const LoggerConfig = registerAs<LoggerConfigType>(
  ConfigToken.LOGGER,
  () => {
    // Configuration object defining properties of the logger.
    const config: JoiConfig<LoggerConfigType, string> = {
      // The log client fetched from environment variables.
      client: {
        value: process.env.LOG_CLIENT,
        joi: JoiUtil.schema
          .string()
          .valid(LogClient.CONSOLE, LogClient.FILE)
          .allow(null, '')
          .default(LogClient.CONSOLE),
      },
      // The flag to enable logging fetched from environment variables.
      enabled: {
        value: process.env.LOG_ENABLED,
        joi: JoiUtil.schema.boolean().allow(null, '').default('true'),
      },
      // The log level fetched from environment variables.
      level: {
        value: process.env.LOG_LEVEL,
        joi: JoiUtil.schema
          .string()
          .valid(
            LogLevel.DEBUG,
            LogLevel.ERROR,
            LogLevel.INFO,
            LogLevel.TRACE,
            LogLevel.WARN,
          )
          .allow(null, '')
          .default(LogLevel.INFO),
      },
    };

    return JoiUtil.validate(ConfigToken.LOGGER, config);
  },
);
