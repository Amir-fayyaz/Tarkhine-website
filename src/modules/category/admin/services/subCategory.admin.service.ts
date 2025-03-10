import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from '../../entities/subCategory.entity';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from '../dto/create-SubCategory.dto';
import { SubCategoryFactory } from '../../subCategory.factory';
import { Pagination } from 'src/common/tools/pagination.tool';
import { UpdateSubCategoryDto } from '../dto/update-SubCategory.dto';

@Injectable()
export class SubCategoryAdminService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly SubCategory_Repository: Repository<SubCategoryEntity>,
    private readonly SubCategoryFactory: SubCategoryFactory,
  ) {}

  // private methods
  private async CheckUniqueTitle(title: string, category_id: number) {
    const subCategory = await this.SubCategory_Repository.findOne({
      where: {
        title,
        category: {
          id: category_id,
        },
      },
    });

    if (subCategory)
      throw new ConflictException('There is SubCategory with this title');
  }

  //public methods
  public async createSubCategory(data: CreateSubCategoryDto) {
    await this.CheckUniqueTitle(data.title, data.category_id);

    const category = await this.SubCategoryFactory.findCategoryById(
      data.category_id,
    );

    const newSubCategory = this.SubCategory_Repository.create({
      title: data.title,
      category,
    });

    return await this.SubCategory_Repository.save(newSubCategory);
  }

  public async getSubCategoriesForCategory(category_id: number, page: number) {
    const pagination = Pagination({ page, take: 20 });

    const subCategories = await this.SubCategory_Repository.find({
      where: {
        category: {
          id: category_id,
        },
      },
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
      take: pagination.take,
      skip: pagination.skip,
    });

    return {
      page,
      subCategories,
      count: subCategories.length,
    };
  }

  public async getSubCategoryById(subCategory_id: number) {
    const subCategory = await this.SubCategory_Repository.findOne({
      where: {
        id: subCategory_id,
      },
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

    if (!subCategory)
      throw new NotFoundException('There is no subCategory with this id');

    return {
      subCategory,
    };
  }

  public async updateSubCategory(
    subCategory_id: number,
    data: UpdateSubCategoryDto,
  ) {
    return (
      await this.SubCategory_Repository.update(
        { id: subCategory_id },
        { ...data },
      )
    ).affected === 0
      ? new NotFoundException('There is no subCategory with this id')
      : { success: true };
  }

  public async deleteSubCategory(subCategory_id: number) {
    return (await this.SubCategory_Repository.delete({ id: subCategory_id }))
      .affected === 0
      ? new NotFoundException('There is no subCategory with this id')
      : { success: true };
  }
}
