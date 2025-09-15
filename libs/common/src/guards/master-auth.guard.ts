import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FastifyRequest } from 'fastify';

import { AppConfig } from '@lib/config';

import { X_MASTER_TOKEN_HEADER } from '../constants';

@Injectable()
export class MasterAuthGuard implements CanActivate {
  /**
   * Constructs an instance of MasterAuthGuard.
   * @constructor
   * @param {ConfigType<typeof AppConfig>} config - App configuration object.
   */
  constructor(
    @Inject(AppConfig.KEY)
    private readonly config: ConfigType<typeof AppConfig>,
  ) {}

  /**
   * Method to determine if the route can be activated.
   * Checks for the presence and validity of auth token in the request headers.
   * @param {ExecutionContext} ctx - The execution context.
   * @returns {Promise<boolean>} - Returns true if the request is authorized, otherwise throws an UnauthorizedException.
   * @throws {UnauthorizedException}
   */
  canActivate(ctx: ExecutionContext): boolean {
    const headers = ctx.switchToHttp().getRequest<FastifyRequest>().headers;

    return (
      headers[X_MASTER_TOKEN_HEADER] != null &&
      headers[X_MASTER_TOKEN_HEADER] === this.config.masterToken
    );
  }
}
