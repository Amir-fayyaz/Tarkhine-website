import { Base } from 'src/common/abstracts/base.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('basket')
export class BasketEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.baskets)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.baskets)
  @JoinColumn({ name: 'product' })
  product: ProductEntity;

  @Column({ type: 'int', nullable: false, default: 1 }) //! tinyint => int
  quantity: number;
}
