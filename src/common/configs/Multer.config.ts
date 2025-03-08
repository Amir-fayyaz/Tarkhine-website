import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

export const MulterOption: MulterOptions = {
  storage: diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
      const uploadType = req.query.uploadType as string;

      cb(null, `static/uploads/${uploadType}`);

      if (!fs.existsSync(`storage/uploads/${uploadType}`)) {
        fs.mkdirSync(`static/uploads/${uploadType}`, { recursive: true });
      }
    },

    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
      const uniqueName: number = Date.now() + -Math.round(Math.random() * 1e9);
      const ext: string = file.originalname.split('.').pop();

      cb(null, `${uniqueName}.${ext}`);
    },
  }),

  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    //
    const allowedFileTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('File type not allowed'), false);
    }

    //
    const uploadType = req.query.uploadType as string;

    if (uploadType !== 'profile' && uploadType !== 'food') {
      cb(new BadRequestException('Invalid upload type'), null);
    }
  },

  limits: {
    fileSize: 1024 * 1024 * 4, // 4MB
  },
};
