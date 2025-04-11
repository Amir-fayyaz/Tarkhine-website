import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubCategoryAppService } from '../services/subCategory.client.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/client/subCategories')
@ApiTags('client-subCategory')
@ApiBearerAuth()
// @UseGuards(UserGuard)
@ApiHeader({ name: 'authorization' })
@SkipThrottle()
export class SubCategoryAppController {
  constructor(private readonly SubCategoryService: SubCategoryAppService) {}

  @Get('category/:id')
  @ApiOperation({ summary: 'get subCategories with pagination' })
  @ApiParam({ name: 'id', description: 'category-id' })
  @HttpCode(HttpStatus.OK)
  async getSubCategories(@Param('id', ParseIntPipe) category_id: number) {
    return await this.SubCategoryService.getSubCategories(category_id);
  }
}
