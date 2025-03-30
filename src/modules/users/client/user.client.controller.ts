import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { UserAppService } from './user.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from '../entities/user.entity';
import { SkipThrottle } from '@nestjs/throttler';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Put(':id')
  @ApiOperation({ summary: 'For update profile' })
  @ApiParam({ name: 'id', description: 'user-id' })
  @ApiBody({ type: UpdateUserDto, description: 'required fields' })
  async editProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.UserService.editProfile(id, data);
  }
}
