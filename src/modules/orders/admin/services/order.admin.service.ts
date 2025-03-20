import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderAdminService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly Order_Repository: Repository<OrderEntity>,
  ) {}
}
