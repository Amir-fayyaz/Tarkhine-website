import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ValidateCouponDTO {
  @IsString()
  @IsNotEmpty()
  @Length(19, 19, { message: 'Invalid coupon' })
  @ApiProperty({ example: 'N13Q-LSRB-ZFT5-8K1S' })
  coupon_code: string;
}
