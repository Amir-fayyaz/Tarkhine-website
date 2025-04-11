import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateGlobalCouponDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'discount percent' })
  percent: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  expiredAt: Date;
}
