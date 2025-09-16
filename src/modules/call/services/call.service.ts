import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Call, Prisma } from '@prisma/client';

import { BaseCRUDService } from '@lib/common/services';
import { DbInject } from '@lib/db/db.inject';
import { PrismaService } from '@lib/db/services';

import { UploadCallInfoRequest } from '../dto';
import { ICallService } from '../interfaces';
import { CallCtx, CreateCall, UpdateCall } from '../types';

/**
 * Service class for managing calls.
 */
@Injectable()
export class CallService
  extends BaseCRUDService<
    CreateCall,
    UpdateCall,
    Prisma.CallWhereInput,
    Prisma.CallFindManyArgs,
    Call,
    CallCtx
  >
  implements ICallService
{
  /**
   * Creates an instance of CallService.
   * @constructor
   * @param {PrismaService} prisma - The prisma service to work with database.
   */
  constructor(@Inject(DbInject.PRISMA_SERVICE) prisma: PrismaService) {
    super(Prisma.ModelName.Call, prisma);
  }

  async uploadInfo(data: UploadCallInfoRequest): Promise<Call> {
    try {
      const call = await this.prisma.call.findFirstOrThrow({
        where: { callId: data.callId },
      });

      return call;
    } catch (err: unknown) {
      this.handleError(err, 'uploadInfo');
    }
  }

  /**
   * Create operation.
   * @param {CreateCall} data - The data to create the entity.
   * @returns {Promise<Call>} The created entity.
   */
  protected createOperation(data: CreateCall): Promise<Call> {
    return this.prisma.call.create({ data });
  }

  /**
   * Delete operation.
   * @param {Call} entity - The entity to delete.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected async deleteOperation(entity: Call): Promise<void> {
    await this.prisma.call.delete({ where: { id: entity.id } });
  }

  /**
   * Find by query and count operation.
   * @param {Prisma.CallFindManyArgs} options - The options to find the entities.
   * @returns {Promise<[Call[], number]>} A promise resolving to the list of entities and the count.
   */
  protected async findByQueryAndCountOperation(
    options: Prisma.CallFindManyArgs,
  ): Promise<[Call[], number]> {
    return await this.prisma.$transaction([
      this.prisma.call.findMany(options),
      this.prisma.call.count({ where: options.where }),
    ]);
  }

  /**
   * Find by query operation.
   * @param {Prisma.CallFindManyArgs} options - The options to find the entities.
   * @returns {Promise<Call[]>} A promise resolving to the list of entities.
   */
  protected findByQueryOperation(
    options: Prisma.CallFindManyArgs,
  ): Promise<Call[]> {
    return this.prisma.call.findMany(options);
  }

  /**
   * Find one operation.
   * @param {Prisma.CallFindManyArgs} options - The options to find the entity.
   * @returns {Promise<Call | null>} A promise resolving to the entity or null.
   */
  protected findOneOperation(
    options: Prisma.CallFindManyArgs,
  ): Promise<Call | null> {
    return this.prisma.call.findFirst(options);
  }

  /**
   * Find one or fail operation.
   * @param {Prisma.CallFindManyArgs} options - The options to find the entity.
   * @returns {Promise<Call>} A promise resolving to the entity.
   * @throws {NotFoundException} If the entity is not found.
   */
  protected async findOneOrFailOperation(
    options: Prisma.CallFindManyArgs,
  ): Promise<Call> {
    try {
      return await this.prisma.call.findFirstOrThrow(options);
    } catch (err: unknown) {
      throw new NotFoundException();
    }
  }

  /**
   * Retrieves options for query operations.
   * @protected
   * @param {Prisma.CallWhereInput} query - The query condition.
   * @returns {Prisma.CallFindManyArgs} The options for query operations.
   */
  protected getOptions(
    query: Prisma.CallWhereInput,
    ctx?: CallCtx,
  ): Prisma.CallFindManyArgs {
    const options: Prisma.CallFindManyArgs = { where: query };

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
   * @param {Call} entity - The entity to update.
   * @param {UpdateCall} data - The data to update the entity.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected async updateOperation(
    entity: Call,
    data: UpdateCall,
  ): Promise<void> {
    await this.prisma.call.update({ data, where: { id: entity.id } });
  }
}
