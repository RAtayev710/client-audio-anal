import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class CreateCallRequest {
  @ApiProperty({ name: 'call_info_id' })
  @Expose({ name: 'call_info_id' })
  callId: number;

  @ApiProperty({ name: 'client_phone' })
  @Expose({ name: 'client_phone' })
  clientPhone: string;

  @ApiProperty({ name: 'call_date' })
  @Expose({ name: 'call_date' })
  @Type(() => Date)
  datetime: Date;

  @ApiProperty({ name: 'call_type' })
  @Expose({ name: 'call_type' })
  direction: string;

  @ApiProperty({ name: 'call_duration' })
  @Expose({ name: 'call_duration' })
  duration: number;

  @ApiPropertyOptional({ name: 'manager_name' })
  @Expose({ name: 'manager_name' })
  managerName?: string;

  @ApiPropertyOptional({ name: 'manager_phone' })
  @Expose({ name: 'manager_phone' })
  managerPhone?: string;

  @ApiProperty({ name: 'org_id' })
  @Expose({ name: 'org_id' })
  orgId: number;
}
