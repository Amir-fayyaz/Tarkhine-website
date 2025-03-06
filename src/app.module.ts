import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigs } from './common/configs/typeorm.config';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfigs), AuthModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
