import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from 'src/common/abstracts/Storage.abstract';
import { promises as fs } from 'fs';

@Injectable()
export class ImageService implements StorageService {
  constructor() {}

  async uploadFile(file: Express.Multer.File) {
    return {
      success: true,
      fileInformation: file,
    };
  }

  async deleteFile(path: string) {
    try {
      await fs.unlink(path);

      return { success: true };
    } catch (error) {
      throw new NotFoundException('There is no file with this path');
    }
  }
}
