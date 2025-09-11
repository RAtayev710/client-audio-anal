import { Provider } from '@nestjs/common';

import { DbInject } from './db.inject';
import { PrismaService } from './services';

/**
 * Provider configuration for the prisma service.
 * Provides an instance of the PrismaService class under the specified token.
 */
export const PrismaServiceProvider: Provider = {
  provide: DbInject.PRISMA_SERVICE,
  useFactory: () => new PrismaService().withExtensions(),
};
