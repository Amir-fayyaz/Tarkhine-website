import { Module } from '@nestjs/common';
import { S3Controller } from './image.controller';
import { S3Service } from './image.service';

@Module({
  imports: [],
  controllers: [S3Controller],
  providers: [S3Service],
})
export class ImageModule {}
