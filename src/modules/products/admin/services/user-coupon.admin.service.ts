import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCouponEntity } from '../../entities/user_coupon.entity';
import { Repository } from 'typeorm';
import { CreateUserCouponDto } from '../dto/create-userCoupon.dto';
import { UserAppService } from 'src/modules/users/client/user.client.service';

@Injectable()
export class UserCouponAdminService {
  constructor(
    @InjectRepository(UserCouponEntity)
    private readonly UserCoupon_Repository: Repository<UserCouponEntity>,
    private readonly userService: UserAppService,
  ) {}

  //private methods
  private generateCouponCode(length: number): string {
    const segments = [];
    for (let i = 0; i < length; i++) {
      const segment = Math.random().toString(36).substring(2, 6).toUpperCase();
      segments.push(segment);
    }
    return segments.join('-');
  }

  private async generateUniqueCouponCode(): Promise<string> {
    const couponCode = this.generateCouponCode(4);

    const existingCoupon = await this.UserCoupon_Repository.findOne({
      where: {
        couponCode,
      },
    });

    if (existingCoupon) return this.generateUniqueCouponCode();

    return couponCode;
  }
  //public methods
  public async createCouponForUser(data: CreateUserCouponDto, user_id: number) {
    const user = await this.userService.FindUserById(user_id);

    if (!user) throw new NotFoundException('There is no user with this id');

    data.user = user;

    const couponCode = await this.generateUniqueCouponCode();

    const newCoupon = this.UserCoupon_Repository.create({
      ...data,
      couponCode,
    });

    return await this.UserCoupon_Repository.save(newCoupon);
  }
}
