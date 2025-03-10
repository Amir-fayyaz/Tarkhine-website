import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { ProductAdminFactory } from '../product.admin.factory';
import { Pagination } from 'src/common/tools/pagination.tool';

@Injectable()
export class ProductAdminService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly Product_Repository: Repository<ProductEntity>,
    private readonly ProductFactory: ProductAdminFactory,
  ) {}

  //private methods

  //public methods
  public async createProduct(data: CreateProductDto) {
    const product = await this.Product_Repository.findOne({
      where: {
        name: data.name,
        category: {
          id: data.category_id,
        },
      },
    });

    if (product) {
      throw new ConflictException('There is another product with this name');
    }

    const category = await this.ProductFactory.FindCateogryById(
      data.category_id,
    );

    if (!category)
      throw new NotFoundException('There is no category with this id');

    const newProduct = this.Product_Repository.create({ ...data, category });

    return await this.Product_Repository.save(newProduct);
  }

  public async getProducts(page: number) {
    const pagiantion = Pagination({ page, take: 20 });

    const products = await this.Product_Repository.find({
      order: { createdAt: 'DESC' },
      relations: ['category'],
      select: {
        id: true,
        name: true,
        description: true,
        image_url: true,
        star: true,
        createdAt: true,
        category: {
          title: true,
          id: true,
          createdAt: true,
        },
      },
      take: pagiantion.take,
      skip: pagiantion.skip,
    });

    return {
      page,
      products,
      count: products.length,
    };
  }

  public async getProductById(id: number) {
    const product = await this.Product_Repository.findOne({
      where: { id },
      relations: ['category'],
    });

    return product
      ? product
      : { statusCode: 404, message: 'There is no product with this id' };
  }
}
