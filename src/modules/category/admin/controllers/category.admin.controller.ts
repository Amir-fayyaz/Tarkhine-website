import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CategoryAdminService } from '../services/category.admin.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1/admin/category')
@ApiTags('admin-category')
@ApiBearerAuth()
export class CategoryAdminController {
  constructor(private readonly CategoryService: CategoryAdminService) {}

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
}
