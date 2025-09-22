import { ApiProperty } from '@nestjs/swagger';
import { CallSatisfactionInfo } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CallSatisfactionInfoDto
  implements DeepPartial<CallSatisfactionInfo>
{
  @ApiProperty()
  @Expose()
  comparison: string;

  @ApiProperty()
  @Expose()
  finalRatingReason: string;

  @ApiProperty()
  @Expose()
  finalRatingScore: string;

  @ApiProperty()
  @Expose()
  initialRatingReason: string;

  @ApiProperty()
  @Expose()
  initialRatingScore: string;

  @ApiProperty({ type: [String] })
  @Expose()
  recommendations: string[];
}
