export abstract class StorageService {
  abstract uploadFile(file: Express.Multer.File);
  abstract deleteFile(path: string);
}
