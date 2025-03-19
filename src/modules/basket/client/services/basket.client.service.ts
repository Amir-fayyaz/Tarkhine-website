import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from '../../entities/basket.entity';
import { Repository } from 'typeorm';
import { ProductAdminService } from 'src/modules/products/admin/services/product.admin.service';
import { AddProductToBasketDto } from '../dto/addProductToBasket.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UpdateProductQuantityDto } from '../dto/updateQuantity.dto';

@Injectable()
export class BasketAppService {
  constructor(
    @InjectRepository(BasketEntity)
    private readonly Basket_Repository: Repository<BasketEntity>,
    private readonly ProductService: ProductAdminService,
  ) {}

  public async AddProductToBasket(
    data: AddProductToBasketDto,
    product_id: number,
    user: UserEntity,
  ) {
    const isSelecedInBasket = await this.Basket_Repository.findOne({
      where: {
        user: {
          id: user.id,
        },
        product: {
          id: product_id,
        },
      },
    });

    if (isSelecedInBasket)
      throw new ConflictException('You selected this product before');

    const { product } = await this.ProductService.getProductById(product_id);

    const newBasket = this.Basket_Repository.create({ ...data, product, user });

    return await this.Basket_Repository.save(newBasket);
  }

  public async UpdateQuantity(
    data: UpdateProductQuantityDto,
    product_id: number,
    user: UserEntity,
  ) {
    const updateResult = await this.Basket_Repository.update(
      { product: { id: product_id }, user: { id: user.id } },
      { ...data },
    );

    if (updateResult.affected === 0)
      throw new NotFoundException('This product is not in your basket');

    return { success: true };
  }
}
