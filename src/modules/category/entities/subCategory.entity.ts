import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('subcategory')
export class SubCategoryEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;
}
