import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from '../dto/orders/create-order.dto';
import { AddressAppService } from './address.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class OrderAppService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly Order_Repository: Repository<OrderEntity>,
    private readonly AddressService: AddressAppService,
  ) {}

  public async createOrder(data: CreateOrderDto, user: UserEntity) {
    const { address } = await this.AddressService.getAddressById(
      data.address_id,
    );

    const newOrder = this.Order_Repository.create({
      ...data,
      address,
      user,
    });

    return await this.Order_Repository.save(newOrder);
  }
}
