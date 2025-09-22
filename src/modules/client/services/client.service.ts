import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';

import { BaseCRUDService } from '@lib/common/services';
import { DbInject } from '@lib/db/db.inject';
import { PrismaService } from '@lib/db/services';

import { IClientService } from '../interfaces';
import { ClientCtx, CreateClient, UpdateClient } from '../types';

/**
 * Service class for managing clients.
 */
@Injectable()
export class ClientService
  extends BaseCRUDService<
    CreateClient,
    UpdateClient,
    Prisma.ClientWhereInput,
    Prisma.ClientFindManyArgs,
    Client,
    ClientCtx
  >
  implements IClientService
{
  /**
   * Creates an instance of ClientService.
   * @constructor
   * @param {PrismaService} prisma - The prisma service to work with database.
   */
  constructor(@Inject(DbInject.PRISMA_SERVICE) prisma: PrismaService) {
    super(Prisma.ModelName.Client, prisma);
  }

  /**
   * Create operation.
   * @param {CreateClient} data - The data to create the entity.
   * @returns {Promise<Client>} The created entity.
   */
  protected createOperation(data: CreateClient): Promise<Client> {
    return this.prisma.client.create({ data });
  }

  /**
   * Delete operation.
   * @param {Client} entity - The entity to delete.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected async deleteOperation(entity: Client): Promise<void> {
    await this.prisma.client.delete({ where: { id: entity.id } });
  }

  /**
   * Find by query and count operation.
   * @param {Prisma.ClientFindManyArgs} options - The options to find the entities.
   * @returns {Promise<[Client[], number]>} A promise resolving to the list of entities and the count.
   */
  protected async findByQueryAndCountOperation(
    options: Prisma.ClientFindManyArgs,
  ): Promise<[Client[], number]> {
    return await this.prisma.$transaction([
      this.prisma.client.findMany(options),
      this.prisma.client.count({ where: options.where }),
    ]);
  }

  /**
   * Find by query operation.
   * @param {Prisma.ClientFindManyArgs} options - The options to find the entities.
   * @returns {Promise<Client[]>} A promise resolving to the list of entities.
   */
  protected findByQueryOperation(
    options: Prisma.ClientFindManyArgs,
  ): Promise<Client[]> {
    return this.prisma.client.findMany(options);
  }

  /**
   * Find one operation.
   * @param {Prisma.ClientFindManyArgs} options - The options to find the entity.
   * @returns {Promise<Client | null>} A promise resolving to the entity or null.
   */
  protected findOneOperation(
    options: Prisma.ClientFindManyArgs,
  ): Promise<Client | null> {
    return this.prisma.client.findFirst(options);
  }

  /**
   * Find one or fail operation.
   * @param {Prisma.ClientFindManyArgs} options - The options to find the entity.
   * @returns {Promise<Client>} A promise resolving to the entity.
   * @throws {NotFoundException} If the entity is not found.
   */
  protected async findOneOrFailOperation(
    options: Prisma.ClientFindManyArgs,
  ): Promise<Client> {
    try {
      return await this.prisma.client.findFirstOrThrow(options);
    } catch (err: unknown) {
      throw new NotFoundException();
    }
  }

  /**
   * Retrieves options for query operations.
   * @protected
   * @param {Prisma.ClientWhereInput} query - The query condition.
   * @returns {Prisma.ClientFindManyArgs} The options for query operations.
   */
  protected getOptions(
    query: Prisma.ClientWhereInput,
    ctx?: ClientCtx,
  ): Prisma.ClientFindManyArgs {
    const options: Prisma.ClientFindManyArgs = { where: query };

    if (ctx) {
      options.skip = ctx.skip;
      options.take = ctx.take;

      // TODO: Rework after issue fix
      // https://github.com/prisma/prisma/issues/23387
      if (ctx.orderBy)
        options.orderBy = Object.entries(ctx.orderBy).map(([el, value]) => ({
          [el]: value,
        }));

      if (ctx.include) options.include = ctx.include;
    }

    return options;
  }

  /**
   * Update operation.
   * @param {Client} entity - The entity to update.
   * @param {UpdateClient} data - The data to update the entity.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected async updateOperation(
    entity: Client,
    data: UpdateClient,
  ): Promise<void> {
    await this.prisma.client.update({ data, where: { id: entity.id } });
  }
}
