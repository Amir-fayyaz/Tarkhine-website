import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOption } from 'src/common/configs/Multer.config';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { UploadFileType } from './enums/UploadFile.enum';
import { DeleteFileDto } from './dto/deleteFile.dto';

@Controller('api/v1/image')
export class ImageController {
  constructor(private readonly ImageService: ImageService) {}

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
  @UseInterceptors(FileInterceptor('file', MulterOption))
  async UploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    if (!request.file) throw new BadRequestException('Send file please');
    return await this.ImageService.uploadFile(file);
  }

  @Delete()
  @ApiOperation({ summary: 'For delete file with path' })
  @ApiBody({ type: DeleteFileDto })
  @HttpCode(HttpStatus.OK)
  async DeleteFile(@Body() data: DeleteFileDto) {
    return await this.ImageService.deleteFile(data.fullPath);
  }
}
