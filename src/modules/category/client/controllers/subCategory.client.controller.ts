import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SubCategoryAppService } from '../services/subCategory.client.service';

@Controller('api/v1/client/subcategory')
@ApiTags('client-SubCategory')
@ApiBearerAuth()
export class SubCategoryAppController {
  constructor(private readonly SubCategoryService: SubCategoryAppService) {}

  @Get()
  @ApiOperation({ summary: 'For recive subCategories with pagination' })
  @ApiQuery({
    name: 'page',
    default: 1,
    required: false,
    description: 'For pagination',
  })
  @HttpCode(HttpStatus.OK)
  async getSubCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubCategoryService.getSubCategories(page);
  }
}
