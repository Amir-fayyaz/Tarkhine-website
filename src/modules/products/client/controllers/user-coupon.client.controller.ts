import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCouponAppService } from '../services/user-coupon.client.service';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ValidateCouponDTO } from '../dto/validate-userCoupon.dto';
import { UseUserCouponDto } from '../dto/use-userCoupon.dto';

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

  //POST -
  @Post('validate')
  @ApiOperation({ summary: 'For validate user-coupon' })
  @ApiBody({ type: ValidateCouponDTO })
  async ValidateCoupon(
    @Body() data: ValidateCouponDTO,
    @User() user: UserEntity,
  ) {
    return await this.UserCouponService.validateCoupon(
      data.coupon_code,
      user.id,
    );
  }

  @Post('use')
  @ApiOperation({ summary: 'For using coupon by user' })
  @ApiBody({ type: UseUserCouponDto })
  async useUserCoupon(
    @Body() data: UseUserCouponDto,
    @User() user: UserEntity,
  ) {
    return await this.UserCouponService.useUserCouponForBasket(data, user.id);
  }
}
