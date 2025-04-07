import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/products/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductAdminFactory } from '../product.admin.factory';
import { Pagination } from 'src/common/tools/pagination.tool';
import { UpdateProductDto } from '../dto/products/update-product.dto';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { SubCategoryAdminService } from 'src/modules/category/admin/services/subCategory.admin.service';
import { GlobalCouponEntity } from '../../entities/global_coupon.entity';
import { S3Service } from 'src/modules/image/image.service';

//! refactoring
@Injectable()
export class ProductAdminService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly Product_Repository: Repository<ProductEntity>,
    private readonly CategoryService: CategoryAdminService,
    private readonly SubCategoryService: SubCategoryAdminService,
    private readonly ImageService: S3Service,
  ) {}

  //public methods
  public async createProduct(data: CreateProductDto) {
    const product = await this.Product_Repository.findOne({
      where: {
        name: data.name,
      },
    });

    if (product) throw new ConflictException('This product already exists');

    const category = await this.CategoryService.findCategoryById(
      data.category_id,
    );
    const subCategory = await this.SubCategoryService.getSubCategoryById(
      data.subCategory_id,
    );

    const newProduct = this.Product_Repository.create({
      ...data,
      category,
      subCategory: subCategory.subCategory,
    });

    return await this.Product_Repository.save(newProduct);
  }

  public async getProducts(page: number, SubCategory_id: number) {
    const pagiantion = Pagination({ page, take: 20 });
    const products = await this.Product_Repository.find({
      where: { subCategory: { id: SubCategory_id } },
      order: { createdAt: 'DESC' },
      relations: ['category', 'subCategory', 'coupon'],
      select: {
        id: true,
        name: true,
        description: true,
        image_url: true,
        TotalStars: true,
        CountStar: true,
        price: true,
        createdAt: true,
        category: {
          title: true,
          id: true,
          createdAt: true,
        },
        subCategory: {
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
      relations: ['category', 'subCategory', 'coupon'],
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

    // const filePath = resolve(path);

    // if (!existsSync(filePath))
    //   throw new NotFoundException('There is no image with this url');

    product.image_url = path;

    await this.Product_Repository.save(product);

    return { success: true };
  }

  //For use in Star.service.ts
  public async IncreaseTotalStar(
    product_id: number,
    star: number,
    isNew: Boolean,
  ) {
    const { product } = await this.getProductById(product_id);

    if (isNew) {
      product.TotalStars += star;
      product.CountStar += 1;

      await this.Product_Repository.save(product);

      return { success: true };
    } else {
      product.TotalStars += star;
      await this.Product_Repository.save(product);
      return { succcess: true };
    }
  }

  public async AddCouponToProduct(
    product_id: number,
    coupon: GlobalCouponEntity,
  ) {
    const { product } = await this.getProductById(product_id);

    product.coupon = coupon;

    await this.Product_Repository.save(product);

    return { success: true };
  }
}
