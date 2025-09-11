import { Prisma, PrismaClient } from '@prisma/client';

import { ServiceCore } from '@lib/core';
import { PrismaService } from '@lib/db/services';

import { IBaseCRUDService } from '../interfaces';

/**
 * Abstract class representing a base CRUD service.
 * @template Create - Type of the create request body.
 * @template Update - Type of the update request body.
 * @template Where - Type of the where condition.
 * @template Find - Type of the find options.
 * @template Output - Type of the output entity.
 * @template Ctx - Type of the context.
 */
export abstract class BaseCRUDService<
    Create,
    Update,
    Where,
    Find extends { where?: Where },
    Output extends IdObject,
    Ctx extends { transaction?: PrismaClient } = never,
  >
  extends ServiceCore
  implements IBaseCRUDService<Create, Update, Where, Output, Ctx>
{
  /**
   * Creates an instance of BaseCRUDService.
   * @param {Prisma.ModelName} model The name of the prisma model.
   * @param {PrismaService} prisma - The prisma service to work with database.
   */
  constructor(
    protected readonly model: Prisma.ModelName,
    protected readonly prisma: PrismaService,
  ) {
    super();
  }

  /**
   * Creates a new entity.
   * @param {Create} body - The request body.
   * @param {Ctx} [ctx] - Optional context.
   * @returns {Promise<Output>} The created entity.
   */
  async create(body: Create, ctx?: Ctx): Promise<Output> {
    try {
      return await this.createOperation(body, ctx);
    } catch (err: unknown) {
      this.handleError(err, 'create');

      throw err;
    }
  }

  /**
   * Creates a new entities.
   * @param {Create[]} body - The request body.
   * @param {Ctx} [ctx] - Optional context.
   * @returns {Promise<Output[]>} The created entities.
   */
  async createMany(body: Create[], ctx?: Ctx): Promise<Output[]> {
    try {
      if (this.createManyOperation)
        return await this.createManyOperation(body, ctx);
      else throw new Error('createManyOperation is not defined.');
    } catch (err: unknown) {
      this.handleError(err, 'createMany');

      throw err;
    }
  }

  /**
   * Deletes an entity based on a query condition.
   * @param {Where} query The SQL condition for deletion.
   * @param {Ctx} [ctx] - Optional context.
   * @returns {Promise<void>} A promise indicating the success of the operation.
   */
  async delete(query: Where, ctx?: Ctx): Promise<void> {
    try {
      const entity = await this.findOneOrFailOperation(
        this.getOptions(query, ctx),
      );

      await this.deleteOperation(entity, ctx);
    } catch (err: unknown) {
      this.handleError(err, 'delete');

      throw err;
    }
  }

  /**
   * Deletes entities based on a query condition.
   * @param {Where} query The SQL condition for deletion.
   * @param {Ctx} [ctx] - Optional context.
   * @returns {Promise<void>} A promise indicating the success of the operation.
   */
  async deleteMany(query: Where, ctx?: Ctx): Promise<void> {
    try {
      if (this.deleteManyOperation) {
        const entities = await this.findByQueryOperation(
          this.getOptions(query),
        );

        await this.deleteManyOperation(entities, ctx);
      } else throw new Error('deleteManyOperation is not defined.');
    } catch (err: unknown) {
      this.handleError(err, 'deleteMany');

      throw err;
    }
  }

  /**
   * Retrieves a list of entities based on a query condition.
   * @param {Where} query The SQL condition for retrieving entities.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns {Promise<Output[]>} A promise resolving to an array of entities.
   */
  async getList(query: Where, ctx?: Ctx): Promise<Output[]> {
    try {
      return await this.findByQueryOperation(this.getOptions(query, ctx));
    } catch (err: unknown) {
      this.handleError(err, 'getList');

      throw err;
    }
  }

  /**
   * Retrieves a list of entities and their count based on a query condition.
   * @param {Where} query The SQL condition for retrieving entities.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns {Promise<[Output[], number]>} A promise resolving to an array of entities and the total count.
   */
  async getListAndCount(query: Where, ctx?: Ctx): Promise<[Output[], number]> {
    try {
      return await this.findByQueryAndCountOperation(
        this.getOptions(query, ctx),
      );
    } catch (err: unknown) {
      this.handleError(err, 'getListAndCount');

      throw err;
    }
  }

  /**
   * Retrieves a single entity based on a query condition.
   * @param {Where} query The SQL condition for retrieving the entity.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns {Promise<Output | null>} A promise resolving to the found entity, or null if not found.
   */
  async getOne(query: Where, ctx?: Ctx): Promise<Output | null> {
    try {
      return await this.findOneOperation(this.getOptions(query, ctx));
    } catch (err: unknown) {
      this.handleError(err, 'getOne');

      throw err;
    }
  }

  /**
   * Retrieves a single entity based on a query condition, throwing an error if not found.
   * @param {Where} query The SQL condition for retrieving the entity.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns {Promise<Output>} A promise resolving to the found entity.
   */
  async getOneWithException(query: Where, ctx?: Ctx): Promise<Output> {
    try {
      return await this.findOneOrFailOperation(this.getOptions(query, ctx));
    } catch (err: unknown) {
      this.handleError(err, 'getOneWithException');

      throw err;
    }
  }

  /**
   * Updates an entity based on a query condition.
   * @param {Where} query The SQL condition for updating the entity.
   * @param {Update} data The data for updating the entity.
   * @param {Ctx} [ctx] - Optional context.
   * @returns {Promise<Output>} A promise resolving to the updated entity.
   */
  async update(query: Where, data: Update, ctx?: Ctx): Promise<Output> {
    try {
      const oldEntity = await this.findOneOrFailOperation(
        this.getOptions(query),
        ctx,
      );

      await this.updateOperation(oldEntity, data);

      return await this.findOneOrFailOperation(this.getOptions(query), ctx);
    } catch (err: unknown) {
      this.handleError(err, 'update');

      throw err;
    }
  }

  /**
   * Updates multiple entities.
   * @param {Where} query - The query condition.
   * @param {Update} body - The request body.
   * @param {Ctx} [ctx] - Optional context.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  async updateMany(query: Where, body: Update, ctx?: Ctx): Promise<void> {
    try {
      if (this.updateManyOperation)
        await this.updateManyOperation(query, body, ctx);
      else throw new Error('updateManyOperation is not defined.');
    } catch (err: unknown) {
      this.handleError(err, 'updateMany');

      throw err;
    }
  }

  /**
   * Create many operation.
   * @param {Create[]} data - The data to create the entities.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<Output[]>} The created entities.
   */
  protected createManyOperation?(data: Create[], ctx?: Ctx): Promise<Output[]>;

  /**
   * Delete many operation.
   * @param {Output} entities - The array of entities to delete.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected deleteManyOperation?(entities: Output[], ctx?: Ctx): Promise<void>;

  /**
   * Executes a transactional operation with the provided callback.
   * @param {(transaction: PrismaClient) => Promise<T>} runInTransaction The callback function to execute within the transaction.
   * @param {{transaction?: PrismaClient}} [ctx] Optional transaction context.
   * @returns {Promise<T>} A promise that resolves with the result of the transaction operation.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  protected async transaction<T>(
    runInTransaction: (transaction: PrismaClient) => Promise<T>,
    ctx?: { transaction?: PrismaClient },
  ): Promise<T> {
    try {
      return await (ctx?.transaction
        ? runInTransaction(ctx.transaction)
        : this.prisma.$transaction(runInTransaction));
    } catch (err: unknown) {
      this.handleError(err, 'transaction');

      throw err;
    }
  }

  /**
   * Update many operation.
   * @param {Where} query - The query to update.
   * @param {Update} data - The data to update the entity.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected updateManyOperation?(
    query: Where,
    data: Update,
    ctx?: Ctx,
  ): Promise<void>;

  /**
   * Create operation.
   * @param {Create} data - The data to create the entity.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<Output>} The created entity.
   */
  protected abstract createOperation(data: Create, ctx?: Ctx): Promise<Output>;

  /**
   * Delete operation.
   * @param {Output} entity - The entity to delete.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected abstract deleteOperation(entity: Output, ctx?: Ctx): Promise<void>;

  /**
   * Find by query and count operation.
   * @param {Find} options - The options to find the entities.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<[Output[], number]>} A promise resolving to the list of entities and the count.
   */
  protected abstract findByQueryAndCountOperation(
    options: Find,
    ctx?: Ctx,
  ): Promise<[Output[], number]>;

  /**
   * Find by query operation.
   * @param {Find} options - The options to find the entities.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<Output[]>} A promise resolving to the list of entities.
   */
  protected abstract findByQueryOperation(
    options: Find,
    ctx?: Ctx,
  ): Promise<Output[]>;

  /**
   * Find one operation.
   * @param {Find} options - The options to find the entity.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<Output | null>} A promise resolving to the entity or null.
   */
  protected abstract findOneOperation(
    options: Find,
    ctx?: Ctx,
  ): Promise<Output | null>;

  /**
   * Find one or fail operation.
   * @param {Find} options - The options to find the entity.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<Output>} A promise resolving to the entity.
   */
  protected abstract findOneOrFailOperation(
    options: Find,
    ctx?: Ctx,
  ): Promise<Output>;

  /**
   * Retrieves options for query operations.
   * @param {Where} query - The query condition.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns {Find} The options for query operations.
   */
  protected abstract getOptions(query: Where, ctx?: Ctx): Find;

  /**
   * Update operation.
   * @param {Output} entity - The entity to update.
   * @param {Update} data - The data to update the entity.
   * @param {Ctx} [ctx] - The optional context.
   * @returns {Promise<void>} A promise indicating the completion of the operation.
   */
  protected abstract updateOperation(
    entity: Output,
    data: Update,
    ctx?: Ctx,
  ): Promise<void>;
}
