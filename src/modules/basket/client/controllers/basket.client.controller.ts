import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
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
import { BasketAppService } from '../services/basket.client.service';
import { AddProductToBasketDto } from '../dto/addProductToBasket.dto';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('api/v1/client/baskets')
@ApiTags('client-basket')
@ApiBearerAuth()
@UseGuards(UserGuard)
export class BasketAppController {
  constructor(private readonly BasketService: BasketAppService) {}

  @Post(':id')
  @ApiOperation({ summary: 'For add product to user-basket' })
  @ApiBody({
    type: AddProductToBasketDto,
    description: 'reuqired fields',
  })
  @ApiParam({ name: 'id', description: 'product-id' })
  @HttpCode(HttpStatus.CREATED)
  async AddProductToBasket(
    @Body() data: AddProductToBasketDto,
    @Param('id', ParseIntPipe) product_id: number,
    @User() user: UserEntity,
  ) {
    return await this.BasketService.AddProductToBasket(data, product_id, user);
  }
}
