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
import { GlobalCouponAdminService } from '../services/global-coupon.admin.service';
import { CreateGlobalCouponDto } from '../dto/global-coupon/create-globalCoupon.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/admin/global-coupon')
@ApiTags('admin-GlobalCoupon')
@ApiBearerAuth()
@UseGuards(AdminGuard)
@ApiHeader({ name: 'authorization' })
@SkipThrottle()
export class GlobalCouponAdminController {
  constructor(private readonly CouponService: GlobalCouponAdminService) {}

  @Post(':id')
  @ApiOperation({ summary: 'For create discount coupon for product' })
  @ApiBody({ type: CreateGlobalCouponDto, description: 'requirments fields' })
  @ApiParam({ name: 'id', description: 'product-id' })
  @HttpCode(HttpStatus.OK)
  async createCouponForProduct(
    @Body() data: CreateGlobalCouponDto,
    @Param('id', ParseIntPipe) product_id: number,
  ) {
    return await this.CouponService.createCouponForProduct(data, product_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'For delete Produdct-coupon' })
  @ApiParam({
    name: 'id',
    description: 'product-id of product that have an discount-coupon',
  })
  @HttpCode(HttpStatus.OK)
  async deleteCoupon(@Param('id', ParseIntPipe) product_id: number) {
    return await this.CouponService.deleteCoupon(product_id);
  }

  @Get()
  async getCoupons(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.CouponService.getCoupons(page);
  }
}
