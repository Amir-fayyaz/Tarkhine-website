import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity('address')
export class AddressEntity extends Base {
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: false })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: false })
  longitude: number;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders: OrderEntity[];

  @ManyToOne(() => UserEntity, (user) => user.address)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
