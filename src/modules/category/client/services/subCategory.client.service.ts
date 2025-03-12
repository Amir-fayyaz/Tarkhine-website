import { Injectable } from '@nestjs/common';
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
  public async getSubCategories(page: number) {
    const pagination = Pagination({ page, take: 20 });

    const subCategories = await this.subCategory_Repository.find({
      order: { createdAt: 'DESC' },
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
      skip: pagination.skip,
      take: pagination.take,
    });

    return {
      page,
      subCategories,
      count: subCategories.length,
    };
  }
}
