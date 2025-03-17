import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductAdminService } from '../services/product.admin.service';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';
import { CreateProductDto } from '../dto/products/create-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductDto } from '../dto/products/update-product.dto';
import { AddProductImageDto } from '../dto/products/add-productImage.dto';

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
  @Get('subCategory/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'For get all products with pagination' })
  @ApiQuery({
    name: 'page',
    default: 1,
    required: false,
    description: 'For pagination',
  })
  @ApiParam({ name: 'id', description: 'subCategory-id for filter products' })
  async getProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Param('id', ParseIntPipe) subCategory_id: number,
  ) {
    return await this.ProductService.getProducts(page, subCategory_id);
  }

  //GET -
  @Get(':id')
  @ApiOperation({ summary: 'For get specail product with id' })
  @ApiParam({ name: 'id', description: 'product-id' })
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id', ParseIntPipe) productId: number) {
    return await this.ProductService.getProductById(productId);
  }

  //PUT -
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'For update product information' })
  @ApiBody({ type: UpdateProductDto, description: 'required fields' })
  @ApiParam({ name: 'id', description: 'Product-id' })
  async updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() data: UpdateProductDto,
  ) {
    return await this.ProductService.updateProduct(productId, data);
  }

  //DELETE -
  @Delete(':id')
  @ApiOperation({ summary: 'For delete product' })
  @ApiParam({ name: 'id', description: 'Product-id' })
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id', ParseIntPipe) produdctId: number) {
    return await this.ProductService.deleteProduct(produdctId);
  }

  //POST -
  @Post(':id')
  @ApiOperation({ summary: 'For upload image for product' })
  @ApiBody({ type: AddProductImageDto, description: 'required fields' })
  @ApiParam({ name: 'id', description: 'product-id' })
  @HttpCode(HttpStatus.OK)
  async addProductImage(
    @Body() data: AddProductImageDto,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return await this.ProductService.addProductImage(data.path, productId);
  }
}
