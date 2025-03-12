import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

@Entity('subcategory')
export class SubCategoryEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @OneToOne(() => ProductEntity, (product) => product.name, { cascade: true })
  @JoinColumn({ name: 'product' })
  product: ProductEntity;
}
