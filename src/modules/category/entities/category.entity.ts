import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubCategoryEntity } from './subCategory.entity';

@Entity('category')
export class CategoryEntity extends Base {
  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  subcategories: SubCategoryEntity[];
}
