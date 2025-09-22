import { ApiProperty } from '@nestjs/swagger';
import { ClientRelative } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import { ApiIdProperty } from '@lib/common/decorators';

@Exclude()
export class ClientRelativeDto implements DeepPartial<ClientRelative> {
  @ApiProperty()
  @Expose()
  age: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  degreeOfKinship: string;

  @ApiIdProperty()
  @Expose()
  id: Id;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  placeOfWork: string;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
