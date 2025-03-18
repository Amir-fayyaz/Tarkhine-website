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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { ProductAppService } from '../services/product.client.service';

@Controller('api/v1/client/products')
@ApiTags('client-product')
@ApiBearerAuth()
@UseGuards(UserGuard)
export class ProductAppController {
  constructor(private readonly ProductService: ProductAppService) {}

  //GET -
  @Get(':id')
  @ApiOperation({ summary: 'For get products with special subCategory' })
  @ApiParam({ name: 'id', description: 'subCategory-id' })
  @HttpCode(HttpStatus.OK)
  async getProducts(@Param('id', ParseIntPipe) subCategory_id: number) {
    return await this.ProductService.getProductsBySubCategory(subCategory_id);
  }
}
