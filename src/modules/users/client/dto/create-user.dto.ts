import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber('IR')
  @IsString()
  @ApiProperty()
  mobile: string;
}
