import { Base } from 'src/common/abstracts/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user_coupon')
export class UserCouponEntity extends Base {
  @Column({ type: 'int', nullable: false })
  disCount: number;

  @ManyToOne(() => UserEntity, (user) => user.coupons)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ type: 'int', nullable: false })
  product_range: number;

  @Column({ type: 'timestamp', nullable: false })
  expiredAt: Date;
}
