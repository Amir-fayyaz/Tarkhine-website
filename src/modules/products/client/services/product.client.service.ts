import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/tools/pagination.tool';

@Injectable()
export class ProductAppService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly Product_repository: Repository<ProductEntity>,
  ) {}

  //private methods

  //public methods
  public async getProductsBySubCategory(subCategory_id: number) {
    const products = await this.Product_repository.find({
      where: { subCategory: { id: subCategory_id } },
      order: { createdAt: 'DESC' },
      relations: ['category', 'subCategory', 'coupon'],
    });

    return {
      products,
      count: products.length,
    };
  }
}
