import { Base } from 'src/common/abstracts/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { LikeEntity } from './like.entity';
import { SubCategoryEntity } from 'src/modules/category/entities/subCategory.entity';

@Entity('product')
export class ProductEntity extends Base {
  // @Column({ type: 'varchar', nullable: false, unique: true })
  // name: string;

  @OneToOne(() => SubCategoryEntity, (subcategory) => subcategory.product, {
    cascade: true,
  })
  @JoinColumn({ name: 'name' })
  name: SubCategoryEntity;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  image_url: string;

  @Column({ type: 'varchar', nullable: true })
  star: string;

  //relations
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @OneToMany(() => LikeEntity, (like) => like.product)
  likes: LikeEntity[];
}
