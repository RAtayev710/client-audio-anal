import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class CreateCallRequest {
  @ApiProperty({ name: 'call_info_id' })
  @Expose()
  callId: number;

  @ApiProperty({ name: 'client_phone' })
  @Expose()
  clientPhone: string;

  @ApiProperty({ name: 'call_date' })
  @Expose()
  @Type(() => Date)
  datetime: Date;

  @ApiProperty({ name: 'call_type' })
  @Expose()
  direction: string;

  @ApiProperty({ name: 'call_duration' })
  @Expose()
  duration: number;

  @ApiPropertyOptional({ name: 'manager_name' })
  @Expose()
  managerName?: string;

  @ApiPropertyOptional({ name: 'manager_phone' })
  @Expose()
  managerPhone?: string;

  @ApiProperty({ name: 'org_id' })
  @Expose()
  orgId: number;
}
