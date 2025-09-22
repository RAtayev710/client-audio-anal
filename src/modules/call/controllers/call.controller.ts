import { Controller, Get, Inject, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Call } from '@prisma/client';

import { AjvBody, AjvQuery } from '@lib/ajv/decorators';
import {
  Auth,
  CurrentOrgId,
  Dto,
  MasterAuth,
  PageQuery,
} from '@lib/common/decorators';
import { PageOptionDto } from '@lib/common/dto';
import { QueryPipe } from '@lib/common/pipes';
import { MappingUtil } from '@lib/utils';

import { CallInject } from '../call.inject';
import { callSchema } from '../call.schema';
import {
  CallDto,
  CreateCallRequest,
  GetCallListRequest,
  GetCallListResponse,
  UploadCallInfoRequest,
} from '../dto';
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

  @Auth()
  @Get()
  @ApiOkResponse({ type: GetCallListResponse })
  @ApiQuery({ type: GetCallListRequest })
  @ApiOperation({ summary: 'Получить список звонков' })
  async getList(
    @AjvQuery(callSchema.getList(), QueryPipe)
    { sort }: GetCallListRequest,
    @PageQuery() pagination: PageOptionDto,
    @CurrentOrgId() orgId: number,
  ): Promise<{
    data: Call[];
    itemCount: number;
    pagination: PageOptionDto;
  }> {
    const [data, itemCount] = await this.service.getListAndCount(
      { orgId },
      {
        orderBy: sort,
        skip: pagination.offset,
        take: pagination.limit,
        include: {
          clientInfo: { include: { relativeInfo: true } },
          clientInsightsInfo: true,
          satisfactionInfo: true,
        },
      },
    );

    return { data, itemCount, pagination };
  }

  @MasterAuth()
  @Post('info')
  @ApiOkResponse({ type: CallDto })
  @ApiOperation({ summary: 'Загрузить информацию по звонку.' })
  @ApiBody({ type: UploadCallInfoRequest })
  async uploadInfo(
    @AjvBody(callSchema.uploadInfo()) body: UploadCallInfoRequest,
  ): Promise<{ data: Call }> {
    return {
      data: await this.service.uploadInfo(
        MappingUtil.toDto(body, { cls: UploadCallInfoRequest }),
      ),
    };
  }
}
