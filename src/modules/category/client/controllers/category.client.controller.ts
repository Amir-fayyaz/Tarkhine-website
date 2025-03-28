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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { CategoryAppService } from '../services/category.client.service';

@Controller('api/v1/client/category')
@ApiTags('client-Category')
@UseGuards(UserGuard)
@SkipThrottle()
export class CategoryAppController {
  constructor(private readonly CategoryService: CategoryAppService) {}

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
