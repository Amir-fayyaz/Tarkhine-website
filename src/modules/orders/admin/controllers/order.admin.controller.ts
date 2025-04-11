import { Controller } from '@nestjs/common';
import { OrderAdminService } from '../services/order.admin.service';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/admin/orders')
@ApiTags('admin-order')
@ApiBearerAuth()
@ApiHeader({ name: 'authorization' })
@SkipThrottle()
export class OrderAdminController {
  constructor(private readonly OrderService: OrderAdminService) {}
}
