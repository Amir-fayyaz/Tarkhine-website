import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { LikeAppService } from '../services/like.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/client/likes')
@ApiTags('client-like')
@ApiBearerAuth()
@UseGuards(UserGuard)
@SkipThrottle()
export class LikeAppController {
  constructor(private readonly LikeService: LikeAppService) {}

  @Post(':id')
  @ApiOperation({ summary: 'For like or dislike product' })
  @ApiParam({ name: 'id', description: 'product-id' })
  @HttpCode(HttpStatus.OK)
  async LikeOrDisLikeProduct(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) product_id: number,
  ) {
    return await this.LikeService.likeOrDisLikeProduct(product_id, user);
  }

  @Get()
  @ApiOperation({ summary: 'For get products of user like it' })
  @HttpCode(HttpStatus.OK)
  async getLikedProducts(@User() user: UserEntity) {
    return await this.LikeService.getLikedProductsForUser(user);
  }
}
