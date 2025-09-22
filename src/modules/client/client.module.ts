import { Module } from '@nestjs/common';

import { ClientServiceProvider } from './client.providers';
import { ClientController } from './controllers';

/**
 * Represents the client module of the application.
 * This module handles client and related services.
 */
@Module({
  controllers: [ClientController],
  providers: [ClientServiceProvider],
})
export class ClientModule {}
