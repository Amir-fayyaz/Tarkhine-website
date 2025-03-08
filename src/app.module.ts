import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigs } from './common/configs/typeorm.config';
import { CategoryModule } from './modules/category/category.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfigs),
    AuthModule,
    CategoryModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
