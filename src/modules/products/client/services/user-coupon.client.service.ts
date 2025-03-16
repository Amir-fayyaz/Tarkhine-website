import { Injectable } from '@nestjs/common';
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
}
