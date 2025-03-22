import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCouponEntity } from '../../entities/user_coupon.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';

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
}
