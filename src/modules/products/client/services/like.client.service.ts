import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../../entities/like.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ProductAdminService } from '../../admin/services/product.admin.service';

@Injectable()
export class LikeAppService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly Like_Repository: Repository<LikeEntity>,
    private readonly ProductService: ProductAdminService,
  ) {}

  //private methods
  private async isProductLiked(product_id: number, user_id: number) {
    return await this.Like_Repository.exists({
      where: {
        product: { id: product_id },
        user: { id: user_id },
      },
    });
  }

  //public methods
  public async likeOrDisLikeProduct(product_id: number, user: UserEntity) {
    const isLiked = await this.isProductLiked(product_id, user.id);

    if (isLiked) {
      return (
        await this.Like_Repository.delete({
          product: { id: product_id },
          user: { id: user.id },
        })
      ).affected === 0
        ? { statusCode: 404, message: 'There is no product with this id' }
        : { statusCode: 200, message: 'product disliked !' };
    } else {
      const product = await this.ProductService.getProductById(product_id);
      const newLike = this.Like_Repository.create({
        product: product.product,
        user,
      });

      await this.Like_Repository.save(newLike);

      return { statusCode: 201, message: 'Product liked !' };
    }
  }

  public async getLikedProductsForUser(user: UserEntity) {
    return await this.Like_Repository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
      relations: ['product'],
    });
  }
}
