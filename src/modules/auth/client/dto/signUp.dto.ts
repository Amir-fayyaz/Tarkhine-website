import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsPhoneNumber('IR')
  @ApiProperty()
  mobile: string;
}
