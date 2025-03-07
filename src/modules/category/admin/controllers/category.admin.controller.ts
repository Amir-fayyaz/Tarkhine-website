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
  Put,
  Query,
} from '@nestjs/common';
import { CategoryAdminService } from '../services/category.admin.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('api/v1/admin/category')
@ApiTags('admin-category')
@ApiBearerAuth()
export class CategoryAdminController {
  constructor(private readonly CategoryService: CategoryAdminService) {}

  //GET -
  @Get()
  @ApiOperation({ summary: 'For recive categories with pagination' })
  @ApiQuery({
    name: 'page',
    default: 1,
    required: false,
    description: 'For pagination',
  })
  @HttpCode(HttpStatus.OK)
  async getCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.CategoryService.getCategories(page);
  }

  //POST -
  @Post()
  @ApiOperation({ summary: 'For create new Category' })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'requiered fields for create category',
  })
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() data: CreateCategoryDto) {
    return await this.CategoryService.CreateCategory(data);
  }

  //PUT
  @Put(':id')
  @ApiOperation({ summary: 'For update category title' })
  @ApiParam({ name: 'id', description: 'Category-id', type: Number })
  @ApiBody({ type: UpdateCategoryDto, description: 'required fields' })
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return await this.CategoryService.updateCategory(categoryId, data);
  }
}
