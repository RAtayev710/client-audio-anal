import { ApiProperty } from '@nestjs/swagger';
import { AuthToken } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import { ApiIdProperty } from '@lib/common/decorators';

@Exclude()
export class AuthTokenDto implements DeepPartial<AuthToken> {
  @ApiIdProperty()
  @Expose()
  id: Id;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ type: [Number] })
  orgs: number[];

  @ApiProperty()
  @Expose()
  token: string;
}
