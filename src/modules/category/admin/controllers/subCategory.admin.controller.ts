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
import { SubCategoryAdminService } from '../services/subCategory.admin.service';
import { CreateSubCategoryDto } from '../dto/create-SubCategory.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateSubCategoryDto } from '../dto/update-SubCategory.dto';

@Controller('api/v1/admin/subcategory')
@ApiTags('admin-subCategory')
@ApiBearerAuth()
export class SubCategoryAdminController {
  constructor(private readonly SubCategoryService: SubCategoryAdminService) {}

  @Post()
  @ApiOperation({ summary: 'For create new subCategory' })
  @ApiBody({ type: CreateSubCategoryDto, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async createSubCategory(@Body() data: CreateSubCategoryDto) {
    return await this.SubCategoryService.createSubCategory(data);
  }

  //GET -
  @Get('/category/:id')
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

  //GET -
  @Get(':id')
  @ApiOperation({ summary: 'For recive specail subCategory with id' })
  @ApiParam({ name: 'id', description: 'subCategory-id', type: Number })
  @HttpCode(HttpStatus.OK)
  async getSubCategoryById(@Param('id', ParseIntPipe) subCategory_id: number) {
    return await this.SubCategoryService.getSubCategoryById(subCategory_id);
  }

  //PUT -
  @Put(':id')
  @ApiOperation({ summary: 'For update subCategory title' })
  @ApiParam({ name: 'id', description: 'subCategory-id' })
  @ApiBody({ type: UpdateSubCategoryDto, description: 'required fields' })
  @HttpCode(HttpStatus.OK)
  async updateSubCategory(
    @Param('id', ParseIntPipe) subCategory_id: number,
    @Body() data: UpdateSubCategoryDto,
  ) {
    return await this.SubCategoryService.updateSubCategory(
      subCategory_id,
      data,
    );
  }
}
