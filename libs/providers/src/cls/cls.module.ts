import { Module } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ClsModule as NestClsModule } from 'nestjs-cls';

import { X_IP_HEADER } from '@lib/common/constants';

import { StoreKey } from './cls.enums';

/**
 * Module for setting up context-local storage (CLS) for the application.
 */
@Module({
  imports: [
    NestClsModule.forRoot({
      global: true,
      middleware: {
        generateId: true,
        mount: true,
        setup: (cls, req: FastifyRequest) => {
          cls.set(StoreKey.IP, req.headers[X_IP_HEADER] || req.ip);
        },
      },
      interceptor: { generateId: true },
    }),
  ],
})
export class ClsModule {}
