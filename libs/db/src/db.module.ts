import { Global, Module } from '@nestjs/common';

import { PrismaServiceProvider } from './db.provider';

@Global()
@Module({
  providers: [PrismaServiceProvider],
  exports: [PrismaServiceProvider],
})
export class DbModule {}
