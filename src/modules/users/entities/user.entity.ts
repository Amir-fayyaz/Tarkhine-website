import { Base } from 'src/common/abstracts/base.entity';
import { LikeEntity } from 'src/modules/products/entities/like.entity';
import { StarEntity } from 'src/modules/products/entities/stars.entity';
import { UserCouponEntity } from 'src/modules/products/entities/user_coupon.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  mobile: string;

  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  ShowName: string;

  @Column({ type: 'date', nullable: true })
  birthDay: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  //relations
  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => StarEntity, (star) => star.user)
  stars: StarEntity[];

  @OneToMany(() => UserCouponEntity, (coupon) => coupon.user)
  coupons: UserCouponEntity[];
}
