import { CategoryEntity } from 'src/modules/category/entities/category.entity';

export interface IFindCategoryById {
  findCategoryById(id: number): Promise<CategoryEntity>;
}
