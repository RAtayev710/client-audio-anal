import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthToken, Prisma } from '@prisma/client';

import { BaseCRUDService } from '@lib/common/services';
import { DbInject } from '@lib/db/db.inject';
import { PrismaService } from '@lib/db/services';
import { HashUtil } from '@lib/utils';

import { IAuthTokenService } from '../interfaces';
import { AuthTokenCtx, CreateAuthToken, UpdateAuthToken } from '../types';

/**
 * Service class for managing auth tokens.
 */
@Injectable()
export class AuthTokenService
  extends BaseCRUDService<
    CreateAuthToken,
    UpdateAuthToken,
    Prisma.AuthTokenWhereInput,
    Prisma.AuthTokenFindManyArgs,
    AuthToken,
    AuthTokenCtx
  >
  implements IAuthTokenService
{
  /**
   * Creates an instance of AuthTokenService.
   * @constructor
   * @param {PrismaService} prisma - The prisma service to work with database.
   */
  constructor(@Inject(DbInject.PRISMA_SERVICE) prisma: PrismaService) {
    super(Prisma.ModelName.AuthToken, prisma);
  }

  /**
   * Create operation.
   * @param {CreateAuthToken} data - The data to create the entity.
   * @returns {Promise<AuthToken>} The created entity.
   */
  protected createOperation(data: CreateAuthToken): Promise<AuthToken> {
    return this.prisma.authToken.create({
      data: {
        ...data,
        token: HashUtil.generateRandomString(32),
      },
    });
  }

  /**
   * Delete operation.
   * @param {AuthToken} entity - The entity to delete.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected async deleteOperation(entity: AuthToken): Promise<void> {
    await this.prisma.authToken.delete({ where: { id: entity.id } });
  }

  /**
   * Find by query and count operation.
   * @param {Prisma.AuthTokenFindManyArgs} options - The options to find the entities.
   * @returns {Promise<[AuthToken[], number]>} A promise resolving to the list of entities and the count.
   */
  protected async findByQueryAndCountOperation(
    options: Prisma.AuthTokenFindManyArgs,
  ): Promise<[AuthToken[], number]> {
    return await this.prisma.$transaction([
      this.prisma.authToken.findMany(options),
      this.prisma.authToken.count({ where: options.where }),
    ]);
  }

  /**
   * Find by query operation.
   * @param {Prisma.AuthTokenFindManyArgs} options - The options to find the entities.
   * @returns {Promise<AuthToken[]>} A promise resolving to the list of entities.
   */
  protected findByQueryOperation(
    options: Prisma.AuthTokenFindManyArgs,
  ): Promise<AuthToken[]> {
    return this.prisma.authToken.findMany(options);
  }

  /**
   * Find one operation.
   * @param {Prisma.AuthTokenFindManyArgs} options - The options to find the entity.
   * @returns {Promise<AuthToken | null>} A promise resolving to the entity or null.
   */
  protected findOneOperation(
    options: Prisma.AuthTokenFindManyArgs,
  ): Promise<AuthToken | null> {
    return this.prisma.authToken.findFirst(options);
  }

  /**
   * Find one or fail operation.
   * @param {Prisma.AuthTokenFindManyArgs} options - The options to find the entity.
   * @returns {Promise<AuthToken>} A promise resolving to the entity.
   * @throws {NotFoundException} If the entity is not found.
   */
  protected async findOneOrFailOperation(
    options: Prisma.AuthTokenFindManyArgs,
  ): Promise<AuthToken> {
    try {
      return await this.prisma.authToken.findFirstOrThrow(options);
    } catch (err: unknown) {
      throw new NotFoundException();
    }
  }

  /**
   * Retrieves options for query operations.
   * @protected
   * @param {Prisma.AuthTokenWhereInput} query - The query condition.
   * @returns {Prisma.AuthTokenFindManyArgs} The options for query operations.
   */
  protected getOptions(
    query: Prisma.AuthTokenWhereInput,
    ctx?: AuthTokenCtx,
  ): Prisma.AuthTokenFindManyArgs {
    const options: Prisma.AuthTokenFindManyArgs = { where: query };

    if (ctx) {
      options.skip = ctx.skip;
      options.take = ctx.take;

      // TODO: Rework after issue fix
      // https://github.com/prisma/prisma/issues/23387
      if (ctx.orderBy)
        options.orderBy = Object.entries(ctx.orderBy).map(([el, value]) => ({
          [el]: value,
        }));
    }

    return options;
  }

  /**
   * Update operation.
   * @param {AuthToken} entity - The entity to update.
   * @param {UpdateAuthToken} data - The data to update the entity.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected async updateOperation(
    entity: AuthToken,
    { isRevoked }: UpdateAuthToken,
  ): Promise<void> {
    const updateData: Prisma.AuthTokenUpdateInput = {};

    if (isRevoked) updateData.token = HashUtil.generateRandomString(32);

    if (Object.keys(updateData).length)
      await this.prisma.authToken.update({
        data: updateData,
        where: { id: entity.id },
      });
  }
}
