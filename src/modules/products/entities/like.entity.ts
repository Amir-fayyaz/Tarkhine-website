import { Base } from 'src/common/abstracts/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('like')
export class LikeEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.likes)
  @JoinColumn({ name: 'product' })
  product: ProductEntity;
}
