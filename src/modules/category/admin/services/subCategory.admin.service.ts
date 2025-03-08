import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from '../../entities/subCategory.entity';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from '../dto/create-SubCategory.dto';
import { SubCategoryFactory } from '../../subCategory.factory';

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
}
