import { registerAs } from '@nestjs/config';

import { ConfigToken } from '@lib/common/enums';
import { JoiUtil } from '@lib/utils';

import { AppConfigType, JoiConfig } from '../types';

/**
 * Application configuration constant.
 * @constant {AppConfig}
 * @returns {AppConfigType} The application configuration object.
 */
export const AppConfig = registerAs(ConfigToken.APP, () => {
  // Configuration object defining various properties of the application.
  const config: JoiConfig<AppConfigType, string> = {
    // The global prefix fetched from environment variables.
    globalPrefix: {
      value: process.env.APP_GLOBAL_PREFIX,
      joi: JoiUtil.schema.string().allow(null, '').default(''),
    },
    // The host fetched from environment variables.
    host: {
      value: process.env.APP_HOST,
      joi: JoiUtil.schema.string().allow(null, '').default('127.0.0.1'),
    },
    // The name of application fetched from environment variables.
    name: {
      value: process.env.APP_NAME,
      joi: JoiUtil.schema.string().allow(null, '').default(''),
    },
    // The port fetched from environment variables.
    port: {
      value: process.env.APP_PORT,
      joi: JoiUtil.schema.number().required(),
    },
  };

  // Validate and return the application configuration.
  return JoiUtil.validate(ConfigToken.APP, config);
});
