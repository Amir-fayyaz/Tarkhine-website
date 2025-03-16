import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCouponAppService } from '../services/user-coupon.client.service';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('api/v1/client/userCoupon')
@ApiTags('client-userCoupon')
@UseGuards(UserGuard)
export class UserCouponAppController {
  constructor(private readonly UserCouponService: UserCouponAppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'For getUser-Coupons' })
  async getUserCoupons(@User() user: UserEntity) {
    return await this.UserCouponService.getUserCoupons(user);
  }
}
