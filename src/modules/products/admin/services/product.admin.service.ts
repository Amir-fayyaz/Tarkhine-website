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
}
