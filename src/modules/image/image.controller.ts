import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UploadFileType } from './enums/UploadFile.enum';
import { DeleteFileDto } from './dto/deleteFile.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/image')
@ApiTags('image')
@SkipThrottle()
export class S3Controller {
  constructor(private readonly ImageService: S3Service) {}

  @Post()
  @ApiOperation({ summary: 'For upload file into storage' })
  @ApiQuery({
    name: 'uploadType',
    description: 'For undrastand of where should i save this file',
    enum: UploadFileType,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'For upload file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async UploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
    @Query('uploadType') foldername: UploadFileType,
  ) {
    if (!request.file) throw new BadRequestException('Send file please');
    return await this.ImageService.uploadFile(file, foldername);
  }

  @Delete()
  @ApiOperation({ summary: 'For delete file with path' })
  @ApiBody({ type: DeleteFileDto })
  @HttpCode(HttpStatus.OK)
  async DeleteFile(@Body() data: DeleteFileDto) {
    return await this.ImageService.deleteFile(data.fullPath);
  }
}
