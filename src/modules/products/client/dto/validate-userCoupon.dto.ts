import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ValidateCouponDTO {
  @IsString()
  @IsNotEmpty()
  @Length(19, 19, { message: 'Invalid coupon' })
  coupon_code: string;
}
