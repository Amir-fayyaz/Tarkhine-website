// import { Injectable, NotFoundException } from '@nestjs/common';
// import { StorageService } from 'src/common/abstracts/Storage.abstract';
// import { promises as fs } from 'fs';

// @Injectable()
// export class ImageService implements StorageService {
//   constructor() {}

//   async uploadFile(file: Express.Multer.File) {
//     return {
//       success: true,
//       fileInformation: file,
//     };
//   }

//   async deleteFile(path: string) {
//     try {
//       await fs.unlink(path);

//       return { success: true };
//     } catch (error) {
//       throw new NotFoundException('There is no file with this path');
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import { UploadFileType } from './enums/UploadFile.enum';

config();
const { S3_SECRET, S3_ACCESS, S3_BUCKET, S3_ENDPOINT } = process.env;

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName = S3_BUCKET;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: S3_ENDPOINT,
      region: 'default',
      credentials: {
        accessKeyId: S3_ACCESS,
        secretAccessKey: S3_SECRET,
      },
      forcePathStyle: true,
    });
  }

  // آپلود فایل
  async uploadFile(file: Express.Multer.File, folder: UploadFileType) {
    const key = folder ? `${folder}/${file.originalname}` : file.originalname;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      await this.s3Client.send(
        new PutObjectCommand(uploadParams as PutObjectCommandInput),
      );
      return {
        url: `https://${this.bucketName}.storage.c2.liara.space/${key}`,
        key,
      };
    } catch (error) {
      console.error('Upload Error:', error);
      throw new Error('خطا در آپلود فایل');
    }
  }

  // حذف فایل
  async deleteFile(key: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
      return { success: true, message: 'فایل با موفقیت حذف شد' };
    } catch (error) {
      console.error('Delete Error:', error);
      throw new Error('خطا در حذف فایل');
    }
  }
}
