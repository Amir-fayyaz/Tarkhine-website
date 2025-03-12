import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from '../../entities/subCategory.entity';
import { Repository } from 'typeorm';
import { CategoryAdminService } from './category.admin.service';
import { CreateSubCategoryDto } from '../dto/create-SubCategory.dto';
import { Pagination } from 'src/common/tools/pagination.tool';

@Injectable()
export class SubCategoryAdminService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly SubCategory_Repository: Repository<SubCategoryEntity>,
    private readonly CategoryService: CategoryAdminService,
  ) {}

  //private methods

  //public methods
  public async createSubCategory(data: CreateSubCategoryDto) {
    const category = await this.CategoryService.findCategoryById(
      data.category_id,
    );

    if (!category)
      throw new NotFoundException('There is no category with this id');

    const OldSubCategory = await this.SubCategory_Repository.findOne({
      where: {
        title: data.title,
        category: {
          id: data.category_id,
        },
      },
    });

    if (OldSubCategory)
      throw new ConflictException('this subCategory existed before');

    const newSubCategory = await this.SubCategory_Repository.create({
      title: data.title,
      category,
    });

    return await this.SubCategory_Repository.save(newSubCategory);
  }

  public async getSubCategoryById(subCategory_id: number) {
    const subCategory = await this.SubCategory_Repository.findOne({
      where: { id: subCategory_id },
      relations: ['category'],
    });

    if (!subCategory)
      throw new NotFoundException('There is no subCategory with this id');

    return { subCategory };
  }

  public async getSubCategories(page: number) {
    const pagination = Pagination({ page, take: 20 });

    const subCategories = await this.SubCategory_Repository.find({
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
    });

    return {
      page,
      subCategories,
      count: subCategories.length,
    };
  }
}
