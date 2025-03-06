import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/client/category')
@ApiTags('client-Category')
export class CategoryAppController {
  constructor() {}
}
