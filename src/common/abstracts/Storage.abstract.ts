export abstract class StorageService {
  abstract uploadFile(file: Express.Multer.File): Promise<{
    success: Boolean;
    fileInformation: Express.Multer.File;
  }>;
  abstract deleteFile(path: string): Promise<{ success: Boolean }>;
}
