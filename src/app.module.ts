import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { ClsService } from 'nestjs-cls';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

import { LogClient } from '@lib/common/enums';
import { AppConfig, ConfigModule, LoggerConfig } from '@lib/config';
import { DbModule } from '@lib/db/db.module';
import { StoreKey } from '@lib/providers/cls/cls.enums';
import { ClsModule } from '@lib/providers/cls/cls.module';

@Module({
  imports: [
    ClsModule,
    ConfigModule,
    DbModule,
    WinstonModule.forRootAsync({
      inject: [AppConfig.KEY, LoggerConfig.KEY, ClsService],
      useFactory: (
        appConfig: ConfigType<typeof AppConfig>,
        loggerConfig: ConfigType<typeof LoggerConfig>,
        cls: ClsService,
      ) => ({
        format: format.combine(
          /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
          format.timestamp(),
          format.errors({ stack: true }),
          format((info) => {
            const ip = cls.get<string>(StoreKey.IP);
            const requestId = cls.getId();

            if (ip) info.ip = ip;
            if (requestId) info.requestId = requestId;

            return info;
          })(),
          format.json(),
        ),
        defaultMeta: { application: appConfig.name, pid: process.pid },
        level: loggerConfig.level,
        silent: !loggerConfig.enabled,
        transports: getWinstonTransports(loggerConfig),
        handleExceptions: true,
        handleRejections: true,
      }),
    }),
  ],
})
export class AppModule {}

const getWinstonTransports = (config: ConfigType<typeof LoggerConfig>) => {
  switch (config.client) {
    case LogClient.FILE:
      return new transports.DailyRotateFile({
        filename: join(process.cwd(), 'logs', '%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      });
    default:
      return new transports.Console();
  }
};
