import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserCouponAdminService } from '../services/user-coupon.admin.service';
import { CreateUserCouponDto } from '../dto/create-userCoupon.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';

@Controller('api/v1/admin/user-coupon')
@ApiTags('admin-userCoupon')
@ApiBearerAuth()
// @UseGuards(AdminGuard)
export class UserCouponAdminController {
  constructor(private readonly CouponService: UserCouponAdminService) {}

  //POST -
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

  //GET -
  @Get()
  @ApiOperation({ summary: 'For getCoupons' })
  @ApiQuery({
    name: 'page',
    type: Number,
    default: 1,
    required: false,
    description: 'For pagination',
  })
  @HttpCode(HttpStatus.OK)
  async getCoupons(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.CouponService.getAllUserCoupons(page);
  }

  //DELETE -
  @Delete(':id')
  @ApiOperation({ summary: 'For delete usser-coupon' })
  @ApiParam({ name: 'id', description: 'coupon-id you want to remove' })
  @HttpCode(HttpStatus.OK)
  async deleteCoupon(@Param('id', ParseIntPipe) coupon_id: number) {
    return await this.CouponService.deleteUserCoupon(coupon_id);
  }
}
