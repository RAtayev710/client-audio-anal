import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { AppConfig, LoggerConfig } from './configs';

/**
 * Module for configuring application-wide settings.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `${process.cwd()}/${
        process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
      }`,
      load: [AppConfig, LoggerConfig],
    }),
  ],
})
export class ConfigModule {}
