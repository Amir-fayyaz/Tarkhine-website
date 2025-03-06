import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/tools/pagination.tool';

@Injectable()
export class CategoryAdminService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly Category_Repository: Repository<CategoryEntity>,
  ) {}

  //private methods

  //public methods
  public async getCategories(page: number) {
    const pagination = Pagination({ page, take: 20 });

    const categories = await this.Category_Repository.find({
      order: { createdAt: 'DESC' },
      take: pagination.take,
      skip: pagination.skip,
    });

    if (categories.length < 1) {
      throw new NotFoundException('There is no category');
    }

    return {
      page,
      categories,
      count: categories.length,
    };
  }
}
