import { Controller } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('api/v1/image')
export class ImageController {
  constructor(private readonly ImageService: ImageService) {}
}
