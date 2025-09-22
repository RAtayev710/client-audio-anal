import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Call, Prisma, PrismaClient } from '@prisma/client';

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

      await this.transaction(async (transaction) => {
        await this.update(
          { id: call.id },
          {
            clientInterest: data.info.result.callInfo.clientInterest,
            conversationDriver: data.info.result.callInfo.conversationDriver,
            essence: data.info.result.callInfo.essence,
            identifiedProblem: data.info.result.callInfo.identifiedProblem,
            initiatorOfTopics: data.info.result.callInfo.initiatorOfTopics,
            managerTask: data.info.result.managerInfo.managerTask,
            nextContactDate: data.info.result.callInfo.nextContactDate,
            problemResolutionStatus:
              data.info.result.callInfo.problemResolutionStatus,
          },
          { transaction },
        );

        await transaction.callClientInfo.create({
          data: {
            ...data.info.result.clientData,
            call: { connect: { id: call.id } },
            relativeInfo: { create: data.info.result.clientData.relativeInfo },
          },
        });

        await transaction.callClientInsightsInfo.create({
          data: {
            interestsIntensity:
              data.info.result.clientInsightsInfo.interests.intensity,
            interestsMentions:
              data.info.result.clientInsightsInfo.interests.mentions,
            interestsCategories:
              data.info.result.clientInsightsInfo.interests.categories,
            needsIntensity: data.info.result.clientInsightsInfo.needs.intensity,
            needsMentions: data.info.result.clientInsightsInfo.needs.mentions,
            needsCategories:
              data.info.result.clientInsightsInfo.needs.categories,
            painIntensity: data.info.result.clientInsightsInfo.pain.intensity,
            painMentions: data.info.result.clientInsightsInfo.pain.mentions,
            painCategories: data.info.result.clientInsightsInfo.pain.categories,
            call: { connect: { id: call.id } },
          },
        });

        await transaction.callSatisfactionInfo.create({
          data: {
            comparison: data.info.result.satisfactionInfo.comparison,
            finalRatingReason:
              data.info.result.satisfactionInfo.finalRating.reason,
            finalRatingScore:
              data.info.result.satisfactionInfo.finalRating.score,
            initialRatingReason:
              data.info.result.satisfactionInfo.initialRating.reason,
            initialRatingScore:
              data.info.result.satisfactionInfo.initialRating.score,
            call: { connect: { id: call.id } },
            recommendations: data.info.result.satisfactionInfo.recommendations,
          },
        });

        let client = await transaction.client.findFirst({
          where: { id: call.clientPhone },
        });

        if (!client)
          client = await transaction.client.create({
            data: { id: call.clientPhone },
          });

        await this.incrementClientFields(
          client.id,
          {
            age: data.info.result.clientData.age,
            having_children: data.info.result.clientData.havingChildren,
            hobbies: data.info.result.clientData.hobbies,
            job_title: data.info.result.clientData.jobTitle,
            marital_status: data.info.result.clientData.maritalStatus,
            name: data.info.result.clientData.name,
            place_of_residence: data.info.result.clientData.placeOfResidence,
            place_of_work: data.info.result.clientData.placeOfWork,
            sex: data.info.result.clientData.sex,
            sphere_of_activity: data.info.result.clientData.sphereOfActivity,
          },
          transaction,
        );

        if (
          Object.values(data.info.result.clientData.relativeInfo).find(
            (el) => el !== 'не определено',
          )
        )
          await transaction.clientRelative.create({
            data: {
              ...data.info.result.clientData.relativeInfo,
              clientId: client.id,
            },
          });
      });

      return await this.prisma.call.findFirstOrThrow({
        where: { id: call.id },
      });
    } catch (err: unknown) {
      this.handleError(err, 'uploadInfo');

      throw err;
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

  private async incrementClientFields(
    clientId: string,
    fields: Record<
      | 'age'
      | 'having_children'
      | 'hobbies'
      | 'job_title'
      | 'marital_status'
      | 'name'
      | 'place_of_residence'
      | 'place_of_work'
      | 'sex'
      | 'sphere_of_activity',
      string
    >,
    transaction: PrismaClient,
  ) {
    const updates = Object.entries(fields).map(([column, value]) => {
      return `
      ${column} = COALESCE(${column}, '{}'::jsonb) || jsonb_build_object('${value}', COALESCE((${column}->>'${value}')::int, 0) + 1)
    `;
    });

    const query = `
    UPDATE clients
    SET ${updates.join(', ')}
    WHERE id = $1
  `;

    await transaction.$executeRawUnsafe(query, clientId);
  }
}
