import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ClsService } from 'nestjs-cls';

import { DbInject } from '@lib/db/db.inject';
import { PrismaService } from '@lib/db/services';
import { StoreKey } from '@lib/providers/cls/cls.enums';

import { X_ORG_ID_HEADER } from '../constants';

/**
 * Class representing an authentication guard.
 * Protects routes by ensuring valid authentication tokens are present in the request.
 */
export class AuthGuard implements CanActivate {
  /**
   * Constructs an instance of AuthGuard.
   * @constructor
   * @param {PrismaService} prisma - Service for db-related operations.
   * @param {ClsService} cls - The cls service.
   */
  constructor(
    @Inject(DbInject.PRISMA_SERVICE) private readonly prisma: PrismaService,
    @Inject(ClsService) private readonly cls: ClsService,
  ) {}

  /**
   * Method to determine if the route can be activated.
   * Checks for the presence and validity of access token in the request headers.
   * If tokens are valid, sets user information on the request object.
   * @param {ExecutionContext} ctx - The execution context.
   * @returns {Promise<boolean>} - Returns true if the request is authorized, otherwise throws an UnauthorizedException.
   * @throws {UnauthorizedException}
   */
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();

    const token = this.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException();

    const orgId = this.extractOrgIdFromHeader(req);
    if (!orgId) return false;

    try {
      const dbToken = await this.prisma.authToken.findFirst({
        where: { token },
      });

      if (!dbToken) return false;

      if (!dbToken.orgs.includes(parseInt(orgId))) return false;

      req.auth = Object.freeze({ orgId: parseInt(orgId), orgs: dbToken.orgs });

      this.cls.set(StoreKey.AUTH, req.auth);

      return true;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      else throw new UnauthorizedException(err.message);
    }
  }

  protected extractOrgIdFromHeader(
    req: FastifyRequest,
  ): Partial<string | null> {
    const header = req.headers[X_ORG_ID_HEADER];

    return (header as string | undefined) ?? null;
  }

  /**
   * Extracts access token from the request Authorization header.
   * @protected
   * @param {FastifyRequest} req - The HTTP request object.
   * @returns {Partial<string | null>} - Extracted token or null.
   */
  protected extractTokenFromHeader(
    req: FastifyRequest,
  ): Partial<string | null> {
    const header = req.headers['authorization'];
    if (header) {
      const [, token] = header?.split(' ');

      return token;
    } else return null;
  }
}
