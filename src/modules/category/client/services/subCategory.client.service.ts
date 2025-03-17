import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from '../../entities/subCategory.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/tools/pagination.tool';

@Injectable()
export class SubCategoryAppService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly subCategory_Repository: Repository<SubCategoryEntity>,
  ) {}

  //private methods

  //public methods
  public async getSubCategories(category_id: number) {
    const subCategories = await this.subCategory_Repository.find({
      order: { createdAt: 'DESC' },
      where: { category: { id: category_id } },
      relations: ['category'],
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          id: true,
          title: true,
          createdAt: true,
        },
      },
    });

    if (subCategories.length < 1)
      throw new NotFoundException('There is no subCategory for this category');
    return {
      subCategories,
      count: subCategories.length,
    };
  }
}
