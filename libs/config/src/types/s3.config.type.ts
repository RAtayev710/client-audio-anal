import { S3ClientConfig } from '@lib/providers/s3/s3.enums';

export type S3ConfigType = {
  accessKey: string;
  baseUrl: string;
  bucketName: string;
  client: S3ClientConfig;
  endpoint?: string;
  region?: string;
  secretKey: string;
};
