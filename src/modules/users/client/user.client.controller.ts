import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { UserAppService } from './user.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from '../entities/user.entity';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/client/users')
@ApiTags('client-user')
@ApiBearerAuth()
@UseGuards(UserGuard)
@SkipThrottle()
export class UserAppController {
  constructor(private readonly UserService: UserAppService) {}

  @Get('getMe')
  @ApiOperation({ summary: 'For get profile' })
  async getMe(@User() user: UserEntity) {
    return await this.UserService.getProfile(user);
  }
}
