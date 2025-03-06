import { Module } from '@nestjs/common';
import { CategoryAdminModule } from './admin/category.admin.module';
import { CategoryAppModule } from './client/category.client.module';

@Module({
  imports: [CategoryAdminModule, CategoryAppModule],
  controllers: [],
  providers: [],
})
export class CategoryModule {}
