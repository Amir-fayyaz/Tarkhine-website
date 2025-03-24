import { Base } from 'src/common/abstracts/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('payment')
export class PaymentEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  authority: string;

  @Column({ type: 'numeric', nullable: false })
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.payments)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
