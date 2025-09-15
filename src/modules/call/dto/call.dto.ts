import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Call } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import { ApiIdProperty } from '@lib/common/decorators';

@Exclude()
export class CallDto implements DeepPartial<Call> {
  @ApiProperty()
  @Expose()
  callId: number;

  @ApiPropertyOptional()
  @Expose()
  clientInterest?: string;

  @ApiProperty()
  @Expose()
  clientPhone: string;

  @ApiPropertyOptional()
  @Expose()
  conversationDriver?: string;

  @ApiProperty()
  @Expose()
  datetime: Date;

  @ApiProperty()
  @Expose()
  direction: string;

  @ApiProperty()
  @Expose()
  duration: number;

  @ApiPropertyOptional()
  @Expose()
  essence?: string;

  @ApiIdProperty()
  @Expose()
  id: Id;

  @ApiPropertyOptional()
  @Expose()
  identifiedProblem?: string;

  @ApiPropertyOptional()
  @Expose()
  initiatorOfTopics?: string;

  @ApiPropertyOptional()
  @Expose()
  managerName?: string;

  @ApiPropertyOptional()
  @Expose()
  managerPhone?: string;

  @ApiPropertyOptional()
  @Expose()
  managerTask?: string;

  @ApiPropertyOptional()
  @Expose()
  nextContactDate?: string;

  @ApiProperty()
  @Expose()
  orgId: number;

  @ApiPropertyOptional()
  @Expose()
  problemResolutionStatus?: string;
}
