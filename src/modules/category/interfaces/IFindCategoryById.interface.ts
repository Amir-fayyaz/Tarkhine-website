import { CategoryEntity } from '../entities/category.entity';

export interface IFindCategoryById {
  findCategoryById(id: number): Promise<CategoryEntity>;
}
