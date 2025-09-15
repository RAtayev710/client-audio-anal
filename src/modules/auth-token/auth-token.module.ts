import { Module } from '@nestjs/common';

import { AuthTokenServiceProvider } from './auth-token.providers';
import { AuthTokenController } from './controllers';

/**
 * Represents the auth token module of the application.
 * This module handles auth token and related services.
 */
@Module({
  controllers: [AuthTokenController],
  providers: [AuthTokenServiceProvider],
})
export class AuthTokenModule {}
