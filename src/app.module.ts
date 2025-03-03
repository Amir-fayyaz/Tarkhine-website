import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigs } from './common/configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfigs), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
