import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubCategoryAdminService } from '../services/subCategory.admin.service';
import { CreateSubCategoryDto } from '../dto/create-SubCategory.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';

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
}
