import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserCouponAdminService } from '../services/user-coupon.admin.service';
import { CreateUserCouponDto } from '../dto/create-userCoupon.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';

@Controller('api/v1/admin/user-coupon')
@ApiTags('admin-userCoupon')
@ApiBearerAuth()
// @UseGuards(AdminGuard)
export class UserCouponAdminController {
  constructor(private readonly CouponService: UserCouponAdminService) {}

  @Post(':id')
  @ApiOperation({ summary: 'For create discount-coupon for special user' })
  @ApiBody({
    type: CreateUserCouponDto,
    description: 'required fields for creeate coupon',
  })
  @ApiParam({
    name: 'id',
    description: 'user-id of user that want to have new coupon',
  })
  @HttpCode(HttpStatus.CREATED)
  async createCouponForUser(
    @Body() data: CreateUserCouponDto,
    @Param('id', ParseIntPipe) user_id: number,
  ) {
    return await this.CouponService.createCouponForUser(data, user_id);
  }
}
