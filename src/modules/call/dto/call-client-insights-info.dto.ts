import { ApiProperty } from '@nestjs/swagger';
import { CallClientInsightsInfo } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CallClientInsightsInfoDto
  implements DeepPartial<CallClientInsightsInfo>
{
  @ApiProperty({ type: [String] })
  @Expose()
  interestsCategories: string[];

  @ApiProperty()
  @Expose()
  interestsIntensity: number;

  @ApiProperty()
  @Expose()
  interestsMentions: number;

  @ApiProperty({ type: [String] })
  @Expose()
  needsCategories: string[];

  @ApiProperty()
  @Expose()
  needsIntensity: number;

  @ApiProperty()
  @Expose()
  needsMentions: number;

  @ApiProperty({ type: [String] })
  @Expose()
  painCategories: string[];

  @ApiProperty()
  @Expose()
  painIntensity: number;

  @ApiProperty()
  @Expose()
  painMentions: number;
}
