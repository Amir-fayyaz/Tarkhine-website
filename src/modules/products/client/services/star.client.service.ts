import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StarEntity } from '../../entities/stars.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CreateStarDto } from '../dto/create-star.dto';
import { ProductAdminService } from '../../admin/services/product.admin.service';

@Injectable()
export class StarAppService {
  constructor(
    @InjectRepository(StarEntity)
    private readonly Star_Repository: Repository<StarEntity>,
    private readonly ProductService: ProductAdminService,
  ) {}

  //private methods

  //public methods
  public async createOrUpdateStarRate(data: CreateStarDto, user: UserEntity) {
    const star = await this.Star_Repository.findOne({
      where: {
        product: {
          id: data.product_id,
        },
        user: {
          id: user.id,
        },
      },
    });

    const product = await this.ProductService.getProductById(data.product_id);

    if (star) {
      await this.ProductService.IncreaseTotalStar(
        data.product_id,
        data.star - star.star,
        false,
      );
      star.star = data.star;

      await this.Star_Repository.save(star);

      return { message: 'Stars updated successfully', statusCode: 200 };
    } else {
      const newStar = this.Star_Repository.create({
        star: data.star,
        user,
        product: product.product,
      });

      await this.ProductService.IncreaseTotalStar(
        data.product_id,
        data.star,
        true,
      );
      await this.Star_Repository.save(newStar);

      return { star: newStar };
    }
  }

  public async getUserStarsRate(user: UserEntity) {
    const stars = await this.Star_Repository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
      relations: ['product'],
    });

    return {
      stars,
    };
  }

  public async deleteStarRate(product_id: number, user_id: number) {
    return (
      await this.Star_Repository.delete({
        user: { id: user_id },
        product: { id: product_id },
      })
    ).affected === 0
      ? { statusCode: 404, message: 'You did not rated on this product' }
      : { statusCode: 200, message: 'Rate deleted successfully' };
  }
}
