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
import { StarEntity } from './stars.entity';
import { GlobalCouponEntity } from './global_coupon.entity';

//!
@Entity('product')
export class ProductEntity extends Base {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  image_url: string;

  @Column({ type: 'tinyint', nullable: true })
  TotalStars: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  CountStar: number;

  //relations
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @ManyToOne(() => SubCategoryEntity, (subcategory) => subcategory.products)
  @JoinColumn({ name: 'subCategory' })
  subCategory: SubCategoryEntity;

  @OneToMany(() => LikeEntity, (like) => like.product)
  likes: LikeEntity[];

  @OneToMany(() => StarEntity, (star) => star.product)
  stars: StarEntity[];

  @OneToOne(() => GlobalCouponEntity, (coupon) => coupon.product)
  @JoinColumn({ name: 'coupon' })
  coupon: GlobalCouponEntity;
}
