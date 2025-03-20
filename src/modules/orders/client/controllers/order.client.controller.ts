import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderAppService } from '../services/order.client.service';

@Controller('api/v1/client/orders')
@ApiTags('client-order')
export class OrderAppController {
  constructor(private readonly OrderService: OrderAppService) {}
}
