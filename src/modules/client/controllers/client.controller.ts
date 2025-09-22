import { Controller, Get, Inject } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Client } from '@prisma/client';

import { AjvParams, AjvQuery } from '@lib/ajv/decorators';
import { Auth, CurrentOrgId, Dto, PageQuery } from '@lib/common/decorators';
import { PageOptionDto } from '@lib/common/dto';
import { QueryPipe } from '@lib/common/pipes';

import { ClientInject } from '../client.inject';
import { clientSchema } from '../client.schema';
import { ClientDto, GetClientListRequest, GetClientListResponse } from '../dto';
import { IClientService } from '../interfaces';

/**
 * Controller for handling client related operations.
 */
@Dto(ClientDto)
@ApiTags('Client')
@Controller('clients')
export class ClientController {
  /**
   * Creates an instance of ClientController.
   * @constructor
   * @param {IClientService} service - The service to handle client related operations.
   */
  constructor(
    @Inject(ClientInject.SERVICE)
    private readonly service: IClientService,
  ) {}

  @Auth()
  @Get()
  @ApiOkResponse({ type: GetClientListResponse })
  @ApiQuery({ type: GetClientListRequest })
  @ApiOperation({ summary: 'Получить список клиентов' })
  async getList(
    @AjvQuery(clientSchema.getList(), QueryPipe)
    { sort }: GetClientListRequest,
    @PageQuery() pagination: PageOptionDto,
    @CurrentOrgId() orgId: number,
  ): Promise<{
    data: Client[];
    itemCount: number;
    pagination: PageOptionDto;
  }> {
    const [data, itemCount] = await this.service.getListAndCount(
      { orgId },
      {
        orderBy: sort,
        skip: pagination.offset,
        take: pagination.limit,
        include: { relatives: true },
      },
    );

    return { data, itemCount, pagination };
  }

  @Auth()
  @Get(':id')
  @ApiNotFoundResponse({
    description: 'Информация о клиенте с указанным ID не найдена.',
  })
  @ApiOkResponse({ type: ClientDto })
  @ApiOperation({ summary: 'Получить информацию о клиенте по ID' })
  @ApiParam({ name: 'id', required: true })
  async getOne(
    @AjvParams(clientSchema.getOne()) { id }: IdObject,
  ): Promise<{ data: Client }> {
    return {
      data: await this.service.getOneWithException(
        { id },
        { include: { relatives: true } },
      ),
    };
  }
}
