import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('global_coupon')
export class GlobalCouponEntity extends Base {
  @Column({ type: 'int', nullable: false })
  percent: number;

  @Column({ type: 'timestamp', nullable: false })
  expiredAt: Date;

  //relations
  @OneToOne(() => ProductEntity, (product) => product.coupon, { cascade: true })
  @JoinColumn({ name: 'product' })
  product: ProductEntity;
}
