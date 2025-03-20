import { Controller } from '@nestjs/common';
import { OrderAdminService } from '../services/order.admin.service';

@Controller('api/v1/admin/orders')
export class OrderAdminController {
  constructor(private readonly OrderService: OrderAdminService) {}
}
