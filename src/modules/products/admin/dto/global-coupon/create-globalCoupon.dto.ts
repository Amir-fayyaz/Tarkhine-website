import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateGlobalCouponDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'discount percent' })
  percent: number;

  // @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  expiredAt: Date;
}
