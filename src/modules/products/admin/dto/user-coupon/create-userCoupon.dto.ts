import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CreateUserCouponDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'How much you want to disCount on your coupon' })
  disCount: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'This coupon is active for this product-range price or more !',
    type: Number,
  })
  product_range: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  expiredAt: Date;

  @IsOptional()
  user: UserEntity;
}
