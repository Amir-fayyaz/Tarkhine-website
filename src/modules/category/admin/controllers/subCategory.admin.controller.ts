import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SubCategoryAdminService } from '../services/subCategory.admin.service';
import { CreateSubCategoryDto } from '../dto/create-SubCategory.dto';

@Controller('api/v1/admin/subcategory')
export class SubCategoryAdminController {
  constructor(private readonly SubCategoryService: SubCategoryAdminService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSubCategory(@Body() data: CreateSubCategoryDto) {
    return await this.SubCategoryService.createSubCategory(data);
  }
}
