import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}
