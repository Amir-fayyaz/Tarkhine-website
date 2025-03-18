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
import { Pagination } from 'src/common/tools/pagination.tool';

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

      const savedCoupon = await this.GlobalCoupon_Repository.save(newCoupon);
      await this.ProductService.AddCouponToProduct(product_id, savedCoupon);

      return savedCoupon;
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

      const savedCoupon = await this.GlobalCoupon_Repository.save(newCoupon);
      await this.ProductService.AddCouponToProduct(product_id, savedCoupon);

      return savedCoupon;
    } else {
      throw new ConflictException(
        ' discount-coupon for this product already exist , please delete coupon first',
      );
    }
  }

  public async deleteCoupon(product_id: number) {
    const deleteResult = await this.GlobalCoupon_Repository.delete({
      product: { id: product_id },
    });

    if (deleteResult.affected === 0)
      throw new NotFoundException('There is no coupon for this product');

    return { success: true };
  }

  public async getCoupons(page: number) {
    const pagination = Pagination({ page, take: 20 });

    const coupons = await this.GlobalCoupon_Repository.find({
      order: { createdAt: 'DESC' },
      relations: ['product'],
      select: {
        id: true,
        percent: true,
        expiredAt: true,
        createdAt: true,
        product: {
          id: true,
          name: true,
        },
      },
      take: pagination.take,
      skip: pagination.skip,
    });

    return {
      page,
      coupons,
      count: coupons.length,
    };
  }
}
