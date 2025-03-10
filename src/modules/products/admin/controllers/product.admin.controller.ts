import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductAdminService } from '../services/product.admin.service';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/admin/products')
@ApiTags('admin-products')
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class ProductAdminController {
  constructor(private readonly ProductService: ProductAdminService) {}

  @Post()
  @ApiOperation({ description: 'For create new product' })
  @ApiBody({ type: CreateProductDto, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: CreateProductDto) {
    return await this.ProductService.createProduct(data);
  }
}
