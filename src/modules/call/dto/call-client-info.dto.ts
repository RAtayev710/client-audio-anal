import { ApiProperty } from '@nestjs/swagger';
import { CallClientInfo } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';

import { CallClientRelativeInfoDto } from './call-client-relative-info.dto';

@Exclude()
export class CallClientInfoDto implements DeepPartial<CallClientInfo> {
  @ApiProperty()
  @Expose()
  age: string;

  @ApiProperty()
  @Expose()
  ageAssessmentReason: string;

  @ApiProperty()
  @Expose()
  havingChildren: string;

  @ApiProperty()
  @Expose()
  hobbies: string;

  @ApiProperty()
  @Expose()
  jobTitle: string;

  @ApiProperty()
  @Expose()
  maritalStatus: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  placeOfResidence: string;

  @ApiProperty()
  @Expose()
  placeOfWork: string;

  @ApiProperty({ type: CallClientRelativeInfoDto })
  @Expose()
  @Type(() => CallClientRelativeInfoDto)
  relativeInfo: CallClientRelativeInfoDto;

  @ApiProperty()
  @Expose()
  sex: string;

  @ApiProperty()
  @Expose()
  sphereOfActivity: string;
}
