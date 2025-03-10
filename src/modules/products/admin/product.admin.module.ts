import { Module } from '@nestjs/common';
import { ProductAdminController } from './controllers/product.admin.controller';
import { ProductAdminService } from './services/product.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminFactory } from 'src/modules/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/modules/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';
import { ProductAdminFactory } from './product.admin.factory';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, AdminEntity, CategoryEntity]),
  ],
  controllers: [ProductAdminController],
  providers: [
    ProductAdminService,
    JwtService,
    AuthAdminFactory,
    AuthAdminService,
    ProductAdminFactory,
    CategoryAdminService,
  ],
})
export class ProductAdminModule {}
