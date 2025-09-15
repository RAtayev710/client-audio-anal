import { Module } from '@nestjs/common';

import { CallServiceProvider } from './call.providers';
import { CallController } from './controllers';

/**
 * Represents the call module of the application.
 * This module handles call and related services.
 */
@Module({
  controllers: [CallController],
  providers: [CallServiceProvider],
})
export class CallModule {}
