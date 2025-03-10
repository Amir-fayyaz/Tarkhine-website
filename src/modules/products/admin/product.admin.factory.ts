import { Injectable } from '@nestjs/common';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { IFindCategoryById } from '../interfaces/findCategoryById.interface';

@Injectable()
export class ProductAdminFactory {
  private readonly findCategoryById: IFindCategoryById;
  constructor(categoryService: CategoryAdminService) {
    this.findCategoryById = categoryService;
  }

  public async FindCateogryById(id: number) {
    return await this.findCategoryById.findCategoryById(id);
  }
}
