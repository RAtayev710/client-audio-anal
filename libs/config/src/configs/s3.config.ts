import { registerAs } from '@nestjs/config';

import { ConfigToken } from '@lib/common/enums';
import { S3ClientConfig } from '@lib/providers/s3/s3.enums';
import { JoiUtil } from '@lib/utils';

import { JoiConfig, S3ConfigType } from '../types';

/**
 * S3 configuration constant.
 * @constant {S3Config}
 * @returns {S3ConfigType} The S3 configuration object.
 */
export const S3Config = registerAs<S3ConfigType>(ConfigToken.S3, () => {
  // Configuration object defining properties of the S3.
  const config: JoiConfig<S3ConfigType, string> = {
    // The S3 access key fetched from environment variables.
    accessKey: {
      value: process.env.S3_ACCESS_KEY,
      joi: JoiUtil.schema.string().required(),
    },
    // The S3 base url fetched from environment variables.
    baseUrl: {
      value: process.env.S3_BASE_URL,
      joi: JoiUtil.schema.string().required(),
    },
    // The S3 bucket name fetched from environment variables.
    bucketName: {
      value: process.env.S3_BUCKET_NAME,
      joi: JoiUtil.schema.string().required(),
    },
    // The S3 client fetched from environment variables.
    client: {
      value: process.env.S3_CLIENT,
      joi: JoiUtil.schema
        .string()
        .valid(S3ClientConfig.AWS, S3ClientConfig.MINIO)
        .allow(null, '')
        .default(S3ClientConfig.MINIO),
    },
    // The S3 endpoint fetched from environment variables.
    endpoint: {
      value: process.env.S3_ENDPOINT,
      joi: JoiUtil.schema.string().allow(null, ''),
    },
    // The S3 region fetched from environment variables.
    region: {
      value: process.env.S3_REGION,
      joi: JoiUtil.schema.string().allow(null, ''),
    },
    // The S3 secret key fetched from environment variables.
    secretKey: {
      value: process.env.S3_SECRET_KEY,
      joi: JoiUtil.schema.string().required(),
    },
  };

  return JoiUtil.validate(ConfigToken.S3, config);
});
