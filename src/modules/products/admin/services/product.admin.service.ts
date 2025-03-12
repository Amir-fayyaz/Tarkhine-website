import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductAdminFactory } from '../product.admin.factory';
import { Pagination } from 'src/common/tools/pagination.tool';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ImageService } from 'src/modules/image/image.service';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';

//! refactoring
@Injectable()
export class ProductAdminService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly Product_Repository: Repository<ProductEntity>,
    private readonly CategoryService: CategoryAdminService,
    private readonly ImageService: ImageService,
  ) {}

  //public methods
  public async createProduct(data: CreateProductDto) {}

  public async getProducts(page: number) {
    // const pagiantion = Pagination({ page, take: 20 });
    // const products = await this.Product_Repository.find({
    //   order: { createdAt: 'DESC' },
    //   relations: ['category'],
    //   select: {
    //     id: true,
    //     name: true,
    //     description: true,
    //     image_url: true,
    //     star: true,
    //     createdAt: true,
    //     category: {
    //       title: true,
    //       id: true,
    //       createdAt: true,
    //     },
    //   },
    //   take: pagiantion.take,
    //   skip: pagiantion.skip,
    // });
    // return {
    //   page,
    //   products,
    //   count: products.length,
    // };
  }

  public async getProductById(id: number) {
    const product = await this.Product_Repository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product)
      throw new NotFoundException('There is no product with this id');

    return {
      product,
    };
  }

  public async updateProduct(productId: number, data: UpdateProductDto) {
    return (
      await this.Product_Repository.update(
        { id: productId },
        {
          ...data,
        },
      )
    ).affected === 0
      ? { statusCode: 404, message: 'There is no product with this id' }
      : { succcess: true };
  }

  public async deleteProduct(productId: number) {
    const product = await this.Product_Repository.findOne({
      where: { id: productId },
    });

    if (!product)
      throw new NotFoundException('There is no product with this id');

    if (product.image_url) {
      await this.ImageService.deleteFile(product.image_url);
    }

    await this.Product_Repository.remove(product);

    return { success: true };
  }

  public async addProductImage(path: string, productId: number) {
    const product = await this.Product_Repository.findOne({
      where: { id: productId },
    });

    if (!product)
      throw new NotFoundException('There is no product with this id');

    const filePath = resolve(path);

    if (!existsSync(filePath))
      throw new NotFoundException('There is no image with this url');

    product.image_url = path;

    await this.Product_Repository.save(product);

    return { success: true };
  }
}
