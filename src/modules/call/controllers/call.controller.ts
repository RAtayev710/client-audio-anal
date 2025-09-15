import { Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Call } from '@prisma/client';

import { AjvBody } from '@lib/ajv/decorators';
import { Dto, MasterAuth } from '@lib/common/decorators';
import { MappingUtil } from '@lib/utils';

import { CallInject } from '../call.inject';
import { callSchema } from '../call.schema';
import { CallDto, CreateCallRequest } from '../dto';
import { ICallService } from '../interfaces';

/**
 * Controller for handling call related operations.
 */
@Dto(CallDto)
@ApiTags('Call')
@Controller('calls')
export class CallController {
  /**
   * Creates an instance of CallController.
   * @constructor
   * @param {ICallService} service - The service to handle call related operations.
   */
  constructor(
    @Inject(CallInject.SERVICE)
    private readonly service: ICallService,
  ) {}

  /**
   * Endpoint for creating a call.
   * @param {CreateCallRequest} body - The request body to create the call.
   * @returns {Promise<{data: Call}>}
   */
  @MasterAuth()
  @Post()
  @ApiOkResponse({ type: CallDto })
  @ApiOperation({ summary: 'Создать звонок.' })
  @ApiBody({ type: CreateCallRequest })
  async create(
    @AjvBody(callSchema.create()) body: CreateCallRequest,
  ): Promise<{ data: Call }> {
    return {
      data: await this.service.create(
        MappingUtil.toDto(body, { cls: CreateCallRequest }),
      ),
    };
  }
}
