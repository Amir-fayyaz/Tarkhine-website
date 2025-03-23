import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UseUserCouponDto {
  @IsString()
  @Length(19, 19, { message: 'Invalid coupon_code' })
  @IsNotEmpty()
  @ApiProperty({ example: 'N13Q-LSRB-ZFT5-8K1S' })
  coupon_code: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'total price of basket for validate range of that',
  })
  totalPrice: number;
}
