import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
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
  @ApiOperation({ description: 'For create new product' })
  @ApiBody({ type: CreateProductDto, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: CreateProductDto) {
    return await this.ProductService.createProduct(data);
  }

  //GET -
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'For get all products with pagination' })
  @ApiQuery({ name: 'page', default: 1, required: false })
  async getProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.ProductService.getProducts(page);
  }
}
