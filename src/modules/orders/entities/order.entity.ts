import { Base } from 'src/common/abstracts/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('order')
export class OrderEntity extends Base {
  @Column({ type: 'boolean', default: false })
  status: Boolean;

  @Column({ type: 'int', nullable: false })
  TotalPrice: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  //relations
  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
