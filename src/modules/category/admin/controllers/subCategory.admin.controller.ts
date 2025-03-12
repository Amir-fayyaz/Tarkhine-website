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
  UseGuards,
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
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';
import { UpdateSubCategoryDto } from '../dto/update-SubCategory.dto';

@ApiTags('admin-subCategory')
@ApiBearerAuth()
// @UseGuards(AdminGuard)
@Controller('api/v1/admin/subCategories')
export class SubCategoryAdminController {
  constructor(private readonly SubCategoryService: SubCategoryAdminService) {}

  //POST -
  @Post()
  @ApiOperation({ summary: 'For create new subCategory' })
  @ApiBody({ type: CreateSubCategoryDto, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async CreateSubCategory(@Body() data: CreateSubCategoryDto) {
    return await this.SubCategoryService.createSubCategory(data);
  }

  //GET -
  @Get(':id')
  @ApiOperation({ summary: 'For Find subCategory by id' })
  @ApiParam({ name: 'id', description: 'subCategory-id' })
  @HttpCode(HttpStatus.OK)
  async getSubCategoryById(@Param('id', ParseIntPipe) subCategory_id: number) {
    return await this.SubCategoryService.getSubCategoryById(subCategory_id);
  }

  //GET -
  @Get()
  @ApiOperation({ summary: 'For get subCategories with pagination' })
  @ApiQuery({
    name: 'page',
    description: 'For pagination',
    type: Number,
    default: 1,
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  async getSubCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubCategoryService.getSubCategories(page);
  }

  //PUT
  @Put(':id')
  @ApiOperation({ summary: 'For update subCategory title' })
  @ApiBody({ type: UpdateSubCategoryDto, description: 'required fields' })
  @HttpCode(HttpStatus.OK)
  async updateSubCategory(
    @Body() data: UpdateSubCategoryDto,
    @Param('id', ParseIntPipe) subCategory_id: number,
  ) {
    return await this.SubCategoryService.updateSubCategory(
      data,
      subCategory_id,
    );
  }
}
