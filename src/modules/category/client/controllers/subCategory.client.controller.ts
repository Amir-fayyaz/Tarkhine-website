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
import { SubCategoryAppService } from '../services/subCategory.client.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';

@Controller('api/v1/client/subCategories')
@ApiTags('client-subCategory')
@ApiBearerAuth()
@UseGuards(UserGuard)
export class SubCategoryAppController {
  constructor(private readonly SubCategoryService: SubCategoryAppService) {}

  @Get()
  @ApiOperation({ summary: 'get subCategories with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    default: 1,
    description: 'For pagination',
  })
  @HttpCode(HttpStatus.OK)
  async getSubCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubCategoryService.getSubCategories(page);
  }
}
