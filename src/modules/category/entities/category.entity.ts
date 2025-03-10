import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubCategoryEntity } from './subCategory.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

@Entity('category')
export class CategoryEntity extends Base {
  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  //relations
  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  subcategories: SubCategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
