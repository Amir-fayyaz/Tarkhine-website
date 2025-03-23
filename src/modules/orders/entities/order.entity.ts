import { Base } from 'src/common/abstracts/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AddressEntity } from './address.entity';
import { orderStatus } from '../enums/orderStatus.type';

@Entity('order')
export class OrderEntity extends Base {
  @Column({ type: 'enum', enum: orderStatus, default: orderStatus.PENDING })
  status: orderStatus;

  @Column({ type: 'int', nullable: false })
  TotalPrice: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  //relations
  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.orders)
  @JoinColumn({ name: 'address' })
  address: AddressEntity;
}
