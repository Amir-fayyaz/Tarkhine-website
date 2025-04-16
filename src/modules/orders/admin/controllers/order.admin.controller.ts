import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderAdminService } from '../services/order.admin.service';
import { SkipThrottle } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';

@Controller('api/v1/admin/orders')
@ApiTags('admin-order')
@ApiBearerAuth()
@ApiHeader({ name: 'authorization' })
@UseGuards(AdminGuard)
@SkipThrottle()
export class OrderAdminController {
  constructor(private readonly OrderService: OrderAdminService) {}

  @Get('count')
  @ApiOperation({ summary: 'For get total orders' })
  async getTotalOrders() {
    return await this.OrderService.getTotalOrders();
  }
}
