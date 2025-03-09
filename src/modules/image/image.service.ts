import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/common/abstracts/Storage.abstract';

@Injectable()
export class ImageService implements StorageService {
  constructor() {}

  async uploadFile(file: Express.Multer.File) {
    return {
      success: true,
      fileInformation: file,
    };
  }

  deleteFile(path: string) {}
}
