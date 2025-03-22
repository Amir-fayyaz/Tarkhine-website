import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderAppService } from '../services/order.client.service';
import { CreateOrderDto } from '../dto/orders/create-order.dto';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('api/v1/client/orders')
@ApiTags('client-order')
export class OrderAppController {
  constructor(private readonly OrderService: OrderAppService) {}

  @Post()
  @ApiOperation({ summary: 'For create new order' })
  @ApiBody({ type: CreateOrderDto })
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() data: CreateOrderDto, @User() user: UserEntity) {
    return await this.OrderService.createOrder(data, user);
  }
}
