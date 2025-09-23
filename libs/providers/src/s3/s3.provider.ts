import { Provider } from '@nestjs/common';

import { S3Inject } from './s3.inject';
import { S3Service } from './services';

/**
 * Provider configuration for the S3 service.
 * Provides an instance of the S3Service class under the specified token.
 */
export const S3ServiceProvider: Provider = {
  provide: S3Inject.SERVICE,
  useClass: S3Service,
};
