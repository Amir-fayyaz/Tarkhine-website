import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryAdminService } from '../services/category.admin.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from '../dto/create-category.dto';

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
}
