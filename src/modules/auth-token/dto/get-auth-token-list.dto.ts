import { ApiProperty } from '@nestjs/swagger';

import { PageDto, PageOptionDto } from '@lib/common/dto';

import { AuthTokenDto } from './auth-token.dto';

export class GetAuthTokenListRequest extends PageOptionDto {}

export class GetAuthTokenListResponse extends PageDto<AuthTokenDto> {
  @ApiProperty({ type: [AuthTokenDto] })
  data: AuthTokenDto[];
}
