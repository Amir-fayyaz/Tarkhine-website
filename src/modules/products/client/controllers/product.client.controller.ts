import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ProductAppService } from '../services/product.client.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/client/products')
@ApiTags('client-product')
@ApiHeader({ name: 'authorization' })
@SkipThrottle()
export class ProductAppController {
  constructor(private readonly ProductService: ProductAppService) {}

  //GET -
  @Get(':id')
  @ApiOperation({ summary: 'For get products with special subCategory' })
  @ApiParam({ name: 'id', description: 'subCategory-id' })
  @ApiQuery({
    name: 'page',
    description: 'For pagination',
    required: false,
    default: 1,
  })
  @HttpCode(HttpStatus.OK)
  async getProducts(
    @Param('id', ParseIntPipe) subCategory_id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.ProductService.getProductsBySubCategory(
      page,
      subCategory_id,
    );
  }
}
