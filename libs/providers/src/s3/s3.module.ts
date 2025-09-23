import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { S3Config } from '@lib/config';

import { S3ServiceProvider } from './s3.provider';

/**
 * NestJS module for configuring and providing S3 services.
 */
@Module({
  imports: [NestConfigModule.forFeature(S3Config)],
  providers: [S3ServiceProvider],
  exports: [S3ServiceProvider],
})
export class S3Module {}
