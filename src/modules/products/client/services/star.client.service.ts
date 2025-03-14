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
  public async createOrUpdateStar(data: CreateStarDto, user: UserEntity) {
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
      star.star = data.star;

      await this.Star_Repository.save(star);

      return { message: 'Stars updated successfully', statusCode: 200 };
    } else {
      const newStar = this.Star_Repository.create({
        star: data.star,
        user,
        product: product.product,
      });

      await this.Star_Repository.save(newStar);

      return { star: newStar };
    }
  }
}
