import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  path: string;
}
