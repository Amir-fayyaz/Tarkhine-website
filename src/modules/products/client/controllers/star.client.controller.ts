import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StarAppService } from '../services/star.client.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { CreateStarDto } from '../dto/create-star.dto';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('api/v1/client/stars')
@ApiTags('client-star')
@ApiBearerAuth()
@UseGuards(UserGuard)
export class StarAppController {
  constructor(private readonly starService: StarAppService) {}

  //POST -
  @Post()
  @ApiOperation({ summary: 'For createOrUpdate stars' })
  @ApiBody({ type: CreateStarDto, description: 'required fields' })
  @HttpCode(HttpStatus.OK)
  async createStar(@Body() data: CreateStarDto, @User() user: UserEntity) {
    return await this.starService.createOrUpdateStar(data, user);
  }
}
