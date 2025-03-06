import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from '../../entities/subCategory.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/tools/pagination.tool';

@Injectable()
export class SubCategoryAppService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly SubCategory_Repository: Repository<SubCategoryEntity>,
  ) {}

  //private methods

  //public methods
  public async getSubCategories(page: number) {
    const pagination = Pagination({ page, take: 20 });

    const SubCategories = await this.SubCategory_Repository.find({
      order: { createdAt: 'DESC' },
      relations: ['category'],
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          id: true,
          title: true,
        },
      },
      take: pagination.take,
      skip: pagination.skip,
    });

    if (SubCategories.length < 1) {
      throw new NotFoundException('There is no subCategory');
    }

    return {
      page,
      SubCategories,
      count: SubCategories.length,
    };
  }
}
