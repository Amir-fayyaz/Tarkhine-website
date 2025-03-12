import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

@Entity('subcategory')
export class SubCategoryEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories)
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  //relations
  @OneToMany(() => ProductEntity, (product) => product.subCategory)
  products: ProductEntity[];
}
