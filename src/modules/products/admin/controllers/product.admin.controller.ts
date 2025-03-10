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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductAdminService } from '../services/product.admin.service';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1/admin/products')
@ApiTags('admin-products')
@ApiBearerAuth()
// @UseGuards(AdminGuard)
export class ProductAdminController {
  constructor(private readonly ProductService: ProductAdminService) {}

  //POST -
  @Post()
  @ApiOperation({ summary: 'For create new product' })
  @ApiBody({ type: CreateProductDto, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: CreateProductDto) {
    return await this.ProductService.createProduct(data);
  }

  //GET -
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'For get all products with pagination' })
  @ApiQuery({
    name: 'page',
    default: 1,
    required: false,
    description: 'For pagination',
  })
  async getProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.ProductService.getProducts(page);
  }

  //GET -
  @Get(':id')
  @ApiOperation({ summary: 'For get specail product with id' })
  @ApiParam({ name: 'id', description: 'product-id' })
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id', ParseIntPipe) productId: number) {
    return await this.ProductService.getProductById(productId);
  }
}
