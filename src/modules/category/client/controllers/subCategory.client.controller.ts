import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/client/subcategory')
@ApiTags('client-SubCategory')
export class SubCategoryAppController {
  constructor() {}
}
