import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SubCategoryAppService } from '../services/subCategory.client.service';
import { UserGuard } from 'src/modules/auth/guards/User.guard';

@Controller('api/v1/client/subcategory')
@ApiTags('client-SubCategory')
@ApiBearerAuth()
@UseGuards(UserGuard)
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
