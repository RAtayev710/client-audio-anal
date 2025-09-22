import { ApiProperty } from '@nestjs/swagger';
import { CallClientRelativeInfo } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CallClientRelativeInfoDto
  implements DeepPartial<CallClientRelativeInfo>
{
  @ApiProperty()
  @Expose()
  age: string;

  @ApiProperty()
  @Expose()
  degreeOfKinship: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  placeOfWork: string;
}
