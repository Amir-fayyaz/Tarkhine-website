import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubCategoryAdminService } from '../services/subCategory.admin.service';
import { CreateSubCategoryDto } from '../dto/create-SubCategory.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';

@ApiTags('admin-subCategory')
@ApiBearerAuth()
// @UseGuards(AdminGuard)
@Controller('api/v1/admin/subCategories')
export class SubCategoryAdminController {
  constructor(private readonly SubCategoryService: SubCategoryAdminService) {}

  @Post()
  @ApiOperation({ summary: 'For create new subCategory' })
  @ApiBody({ type: CreateSubCategoryDto, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async CreateSubCategory(@Body() data: CreateSubCategoryDto) {
    return await this.SubCategoryService.createSubCategory(data);
  }
}
