import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCouponEntity } from '../../entities/user_coupon.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UseUserCouponDto } from '../dto/use-userCoupon.dto';

@Injectable()
export class UserCouponAppService {
  constructor(
    @InjectRepository(UserCouponEntity)
    private readonly UserCoupon_Repository: Repository<UserCouponEntity>,
  ) {}

  //private methods

  private CheckExpireCoupon(coupon: UserCouponEntity): Boolean {
    return coupon.expiredAt < new Date(Date.now());
  }

  private checkProductRangeForCoupon(
    coupon: UserCouponEntity,
    TotalPrice: number,
  ): Boolean {
    return coupon.product_range < TotalPrice;

    //true => it can be use for this basket
    //false => can not be use for this basket
  }
  //public methods
  public async getUserCoupons(user: UserEntity) {
    const coupons = await this.UserCoupon_Repository.find({
      order: { createdAt: 'DESC' },
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return { coupons, count: coupons.length };
  }

  public async validateCoupon(Coupon_code: string, user_id: number) {
    const coupon = await this.UserCoupon_Repository.findOne({
      where: {
        couponCode: Coupon_code,
        user: {
          id: user_id,
        },
      },
    });

    if (!coupon) throw new BadRequestException('Invalid coupon-code');

    const ExpireResult = this.CheckExpireCoupon(coupon);

    if (ExpireResult) throw new ConflictException('Code has been expired');

    return { success: true };
  }

  public async useUserCouponForBasket(data: UseUserCouponDto, user_id: number) {
    const coupon = await this.UserCoupon_Repository.findOne({
      where: {
        user: {
          id: user_id,
        },
        couponCode: data.coupon_code,
      },
    });

    if (!coupon)
      throw new NotFoundException('There is no coupon with this code');

    const CheckRange = this.checkProductRangeForCoupon(coupon, data.totalPrice);

    if (CheckRange) {
      await this.UserCoupon_Repository.remove(coupon);

      return { success: true };
    } else {
      throw new BadRequestException(
        `Your total-price must be at least ${coupon.product_range} to use this coupon`,
      );
    }
  }
}
