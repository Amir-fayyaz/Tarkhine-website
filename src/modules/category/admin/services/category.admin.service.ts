import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/tools/pagination.tool';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoryAdminService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly Category_Repository: Repository<CategoryEntity>,
  ) {}

  //private methods
  //* this method is checking is category-title unique or not
  private async CheckTitle(title: string) {
    const category = await this.Category_Repository.findOne({
      where: {
        title,
      },
    });

    if (category)
      throw new ConflictException('There is category with this title before');
  }
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

  public async CreateCategory(data: CreateCategoryDto) {
    await this.CheckTitle(data.title);

    const newCategory = this.Category_Repository.create(data);

    return await this.Category_Repository.save(newCategory);
  }
}
