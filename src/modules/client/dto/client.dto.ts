import { ApiProperty } from '@nestjs/swagger';
import { Client, Prisma } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';

import { ApiIdProperty } from '@lib/common/decorators';

import { ClientJsonField } from '../decorators';

import { ClientRelativeDto } from './client-relative.dto';

@Exclude()
export class ClientDto implements DeepPartial<Client> {
  @ClientJsonField()
  @Expose()
  age: Prisma.JsonValue;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ClientJsonField()
  @Expose()
  havingChildren: Prisma.JsonValue;

  @ClientJsonField()
  @Expose()
  hobbies: Prisma.JsonValue;

  @ApiIdProperty()
  @Expose()
  id: Id;

  @ClientJsonField()
  @Expose()
  jobTitle: Prisma.JsonValue;

  @ClientJsonField()
  @Expose()
  maritalStatus: Prisma.JsonValue;

  @ClientJsonField()
  @Expose()
  name: Prisma.JsonValue;

  @ApiProperty()
  @Expose()
  orgId: number;

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @ClientJsonField()
  @Expose()
  placeOfResidence: Prisma.JsonValue;

  @ClientJsonField()
  @Expose()
  placeOfWork: Prisma.JsonValue;

  @ApiProperty({ type: [ClientRelativeDto] })
  @Expose()
  @Type(() => ClientRelativeDto)
  relatives: ClientRelativeDto[];

  @ClientJsonField()
  @Expose()
  sex: Prisma.JsonValue;

  @ClientJsonField()
  @Expose()
  sphereOfActivity: Prisma.JsonValue;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
