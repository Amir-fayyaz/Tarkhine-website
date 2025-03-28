import { Controller } from '@nestjs/common';
import { OrderAdminService } from '../services/order.admin.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/admin/orders')
@SkipThrottle()
export class OrderAdminController {
  constructor(private readonly OrderService: OrderAdminService) {}
}
