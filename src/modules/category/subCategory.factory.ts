import { Injectable } from '@nestjs/common';
import { IFindCategoryById } from './interfaces/IFindCategoryById.interface';
import { CategoryAdminService } from './admin/services/category.admin.service';

@Injectable()
export class SubCategoryFactory {
  private readonly FindCategoryById: IFindCategoryById;
  constructor(CategoryService: CategoryAdminService) {
    this.FindCategoryById = CategoryService;
  }

  public async findCategoryById(id: number) {
    return await this.FindCategoryById.findCategoryById(id);
  }
}
