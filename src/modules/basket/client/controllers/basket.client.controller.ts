import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { BasketAppService } from '../services/basket.client.service';
import { AddProductToBasketDto } from '../dto/addProductToBasket.dto';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UpdateProductQuantityDto } from '../dto/updateQuantity.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/client/baskets')
@ApiTags('client-basket')
@ApiBearerAuth()
@UseGuards(UserGuard)
@ApiHeader({ name: 'authorization' })
@SkipThrottle()
export class BasketAppController {
  constructor(private readonly BasketService: BasketAppService) {}

  //POST -
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

  //PUT -
  @Put(':id')
  @ApiOperation({ summary: 'For upadate product-quantity in basket' })
  @ApiBody({ type: UpdateProductQuantityDto, description: 'requirment fields' })
  @ApiParam({ name: 'id', description: 'product-id' })
  @HttpCode(HttpStatus.OK)
  async UpdateProductQuantityInBasket(
    @Param('id', ParseIntPipe) product_id: number,
    @Body() data: UpdateProductQuantityDto,
    @User() user: UserEntity,
  ) {
    return await this.BasketService.UpdateQuantity(data, product_id, user);
  }

  //GET -
  @Get()
  @ApiOperation({ summary: 'For get user-basket' })
  @HttpCode(HttpStatus.OK)
  async getUserBasket(@User() user: UserEntity) {
    return await this.BasketService.getUserBasket(user);
  }

  //DELETE -
  @Delete(':id')
  @ApiOperation({ summary: 'For delete product from basket' })
  @ApiParam({ name: 'id', description: 'product-id' })
  @HttpCode(HttpStatus.OK)
  async deleteProductFromBasket(
    @Param('id', ParseIntPipe) product_id: number,
    @User() user: UserEntity,
  ) {
    return await this.BasketService.deleteProductFromBasket(product_id, user);
  }
}
