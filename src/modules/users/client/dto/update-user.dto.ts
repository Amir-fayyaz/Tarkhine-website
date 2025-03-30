import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @ApiProperty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 60)
  @ApiProperty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ShowName: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ description: 'is not required , it`s a date string' })
  birthDay: string;
}
