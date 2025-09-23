import { Module } from '@nestjs/common';

import { S3Module } from '@lib/providers/s3/s3.module';

import { CallServiceProvider } from './call.providers';
import { CallController } from './controllers';

/**
 * Represents the call module of the application.
 * This module handles call and related services.
 */
@Module({
  imports: [S3Module],
  controllers: [CallController],
  providers: [CallServiceProvider],
})
export class CallModule {}
