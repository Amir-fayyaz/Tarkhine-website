import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalCouponEntity } from '../../entities/global_coupon.entity';
import { Repository } from 'typeorm';
import { ProductAdminService } from './product.admin.service';
import { CreateGlobalCouponDto } from '../dto/global-coupon/create-globalCoupon.dto';

@Injectable()
export class GlobalCouponAdminService {
  constructor(
    @InjectRepository(GlobalCouponEntity)
    private readonly GlobalCoupon_Repository: Repository<GlobalCouponEntity>,
    private readonly ProductService: ProductAdminService,
  ) {}

  //private methods
  private CheckExpire(coupon: GlobalCouponEntity): Boolean {
    return coupon.expiredAt < new Date(Date.now());

    //true => expired
    //false => did not expire
  }

  //public methods
  public async createCouponForProduct(
    data: CreateGlobalCouponDto,
    product_id: number,
  ) {
    const coupon = await this.GlobalCoupon_Repository.findOne({
      where: {
        product: {
          id: product_id,
        },
      },
    });

    if (!coupon) {
      const { product } = await this.ProductService.getProductById(product_id);

      const newCoupon = this.GlobalCoupon_Repository.create({
        ...data,
        product,
      });

      return await this.GlobalCoupon_Repository.save(newCoupon);
    }

    const expireResult = this.CheckExpire(coupon);

    //remove old coupon & create newOne
    if (expireResult) {
      await this.GlobalCoupon_Repository.remove(coupon);

      const { product } = await this.ProductService.getProductById(product_id);
      const newCoupon = this.GlobalCoupon_Repository.create({
        ...data,
        product,
      });

      return await this.GlobalCoupon_Repository.save(newCoupon);
    } else {
      throw new ConflictException(
        ' discount-coupon for this product already exist , please delete coupon first',
      );
    }
  }
}
