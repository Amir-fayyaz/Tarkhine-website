import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { UserGuard } from 'src/modules/auth/guards/User.guard';

@Controller('api/v1/client/category')
@ApiTags('client-Category')
@UseGuards(UserGuard)
@SkipThrottle()
export class CategoryAppController {
  constructor() {}
}
