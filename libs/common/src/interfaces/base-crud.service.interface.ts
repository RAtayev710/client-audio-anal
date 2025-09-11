/**
 * Represents a base CRUD (Create, Read, Update, Delete) service interface.
 * @template Create - Type of the create request body.
 * @template Update - Type of the update request body.
 * @template Where - Type of the where condition.
 * @template Output - Type of the output entity.
 * @template Ctx - Type of the context.
 */
export interface IBaseCRUDService<
  Create,
  Update,
  Where,
  Output extends IdObject,
  Ctx = never,
> {
  /**
   * Creates a new entity.
   * @param {Create} body The data for creating the entity.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise resolving to the created entity.
   */
  create(body: Create, ctx?: Ctx): Promise<Output>;

  /**
   * Creates a new entities.
   * @param {Create[]} body The data for creating the entities.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise resolving to the created entities.
   */
  createMany(body: Create[], ctx?: Ctx): Promise<Output[]>;

  /**
   * Deletes an entity based on a query condition.
   * @param {Where} query The SQL condition for deletion.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise indicating the success of the operation.
   */
  delete(query: Where, ctx?: Ctx): Promise<void>;

  /**
   * Deletes entities based on a query condition.
   * @param {Where} query The SQL condition for deletion.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise indicating the success of the operation.
   */
  deleteMany(query: Where, ctx?: Ctx): Promise<void>;

  /**
   * Retrieves a list of entities based on a query condition.
   * @param {Where} query The SQL condition for retrieving entities.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise resolving to an array of entities.
   */
  getList(query: Where, ctx?: Ctx): Promise<Output[]>;

  /**
   * Retrieves a list of entities and their count based on a query condition.
   * @param {Where} query The SQL condition for retrieving entities.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise resolving to an array of entities and the total count.
   */
  getListAndCount(query: Where, ctx?: Ctx): Promise<[Output[], number]>;

  /**
   * Retrieves a single entity based on a query condition.
   * @param {Where} query The SQL condition for retrieving the entity.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise resolving to the found entity, or null if not found.
   */
  getOne(query: Where, ctx?: Ctx): Promise<Output | null>;

  /**
   * Retrieves a single entity based on a query condition, throwing an error if not found.
   * @param {Where} query The SQL condition for retrieving the entity.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise resolving to the found entity.
   */
  getOneWithException(query: Where, ctx?: Ctx): Promise<Output>;

  /**
   * Updates an entity based on a query condition.
   * @param {Where} query The SQL condition for updating the entity.
   * @param {Update} body The data for updating the entity.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise resolving to the updated entity.
   */
  update(query: Where, body: Update, ctx?: Ctx): Promise<Output>;

  /**
   * Updates multiple entities based on a query condition.
   * @param {Where} query The SQL condition for updating the entities.
   * @param {Update} body The data for updating the entities.
   * @param {Ctx} [ctx] Optional context for the operation.
   * @returns A promise indicating the success of the operation.
   */
  updateMany(query: Where, body: Update, ctx?: Ctx): Promise<void>;
}
