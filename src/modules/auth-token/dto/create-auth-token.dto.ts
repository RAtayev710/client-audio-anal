import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthTokenRequest {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [Number] })
  orgs: number[];
}
