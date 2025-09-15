import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthToken } from '@prisma/client';

import { AjvBody, AjvParams } from '@lib/ajv/decorators';
import { Auth, Dto, PageQuery } from '@lib/common/decorators';
import { PageOptionDto } from '@lib/common/dto';

import { AuthTokenInject } from '../auth-token.inject';
import { authTokenSchema } from '../auth-token.schema';
import {
  AuthTokenDto,
  CreateAuthTokenRequest,
  GetAuthTokenListRequest,
  GetAuthTokenListResponse,
} from '../dto';
import { IAuthTokenService } from '../interfaces';

/**
 * Controller for handling auth token related operations.
 */
@Dto(AuthTokenDto)
@ApiTags('AuthToken')
@Controller('auth-tokens')
export class AuthTokenController {
  /**
   * Creates an instance of AuthTokenController.
   * @constructor
   * @param {IAuthTokenService} service - The service to handle auth token related operations.
   */
  constructor(
    @Inject(AuthTokenInject.SERVICE)
    private readonly service: IAuthTokenService,
  ) {}

  /**
   * Endpoint for creating a auth token.
   * @param {CreateAuthTokenRequest} body - The request body to create the auth token.
   * @returns {Promise<{data: AuthToken}>}
   */
  @Auth()
  @Post()
  @ApiOkResponse({ type: AuthTokenDto })
  @ApiOperation({ summary: 'Создать токен.' })
  @ApiBody({ type: CreateAuthTokenRequest })
  async create(
    @AjvBody(authTokenSchema.create()) body: CreateAuthTokenRequest,
  ): Promise<{ data: AuthToken }> {
    return { data: await this.service.create(body) };
  }

  /**
   * Endpoint for deleting a auth token by ID.
   * @param {IdObject} idObject - The id object containing ID of the auth token to delete.
   * @returns {Promise<void>}
   */
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotFoundResponse({ description: 'Токен с указанным ID не найден.' })
  @ApiNoContentResponse({ description: 'Токен успешно удален.' })
  @ApiOperation({ summary: 'Удалить токен по ID.' })
  @ApiParam({ name: 'id', required: true })
  async delete(
    @AjvParams(authTokenSchema.getOne()) { id }: IdObject,
  ): Promise<void> {
    await this.service.delete({ id });
  }

  /**
   * Endpoint for getting a list of auth tokens.
   * @param {PageOptionDto} pagination - The object containing information about the pagination.
   * @returns {Promise<{data: AuthToken[]; itemCount: number; pagination: PageOptionDto}>}
   */
  @Auth()
  @Get()
  @ApiOkResponse({ type: GetAuthTokenListResponse })
  @ApiQuery({ type: GetAuthTokenListRequest })
  @ApiOperation({ summary: 'Получить список токенов.' })
  async getList(@PageQuery() pagination: PageOptionDto): Promise<{
    data: AuthToken[];
    itemCount: number;
    pagination: PageOptionDto;
  }> {
    const [data, itemCount] = await this.service.getListAndCount(
      {},
      { skip: pagination.offset, take: pagination.limit },
    );

    return { data, itemCount, pagination };
  }

  /**
   * Endpoint for revoking a auth token by ID.
   * @param {IdObject} idObject - The id object containing ID of the auth token to revoke.
   * @returns {Promise<void>}
   */
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/revoke')
  @ApiNotFoundResponse({ description: 'Токен с указанным ID не найден.' })
  @ApiNoContentResponse({ description: 'Токен успешно отозван.' })
  @ApiOperation({ summary: 'Отозвать токен.' })
  @ApiParam({ name: 'id', required: true })
  async revoke(
    @AjvParams(authTokenSchema.getOne()) { id }: IdObject,
  ): Promise<void> {
    await this.service.update({ id }, { isRevoked: true });
  }
}
