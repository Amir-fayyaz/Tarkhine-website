import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/common/abstracts/Storage.abstract';

@Injectable()
export class ImageService implements StorageService {
  constructor() {}

  uploadFile(file: Express.Multer.File) {}

  deleteFile(path: string) {}
}
