import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SubCategoryAdminService } from '../services/subCategory.admin.service';
import { CreateSubCategoryDto } from '../dto/create-SubCategory.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('api/v1/admin/subcategory')
export class SubCategoryAdminController {
  constructor(private readonly SubCategoryService: SubCategoryAdminService) {}

  @Post()
  @ApiOperation({ summary: 'For create new subCategory' })
  @ApiBody({ type: CreateSubCategoryDto, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async createSubCategory(@Body() data: CreateSubCategoryDto) {
    return await this.SubCategoryService.createSubCategory(data);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'For recive subCategory of special category with pagination',
  })
  @ApiParam({ name: 'id', description: 'category_id' })
  @ApiQuery({
    name: 'page',
    description: 'For pagination',
    default: 1,
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  async getSubCategoriesForCategory(
    @Param('id', ParseIntPipe) category_id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubCategoryService.getSubCategoriesForCategory(
      category_id,
      page,
    );
  }
}
