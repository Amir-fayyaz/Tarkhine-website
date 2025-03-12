import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity('stars')
export class StarEntity extends Base {
  @ManyToOne(() => ProductEntity, (product) => product.stars)
  @JoinColumn({ name: 'product' })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.stars)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ type: 'tinyint', nullable: false })
  star: number;
}
