import {
  Body,
  Controller,
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

@Controller('api/v1/client/baskets')
@ApiTags('client-basket')
@ApiBearerAuth()
@UseGuards(UserGuard)
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

  @Put(':id')
  @ApiOperation({ summary: 'For upadate product-quantity in basket' })
  @ApiBody({ type: UpdateProductQuantityDto, description: 'requirment fields' })
  @ApiParam({ name: 'id', description: 'product-id' })
  async UpdateProductQuantityInBasket(
    @Param('id', ParseIntPipe) product_id: number,
    @Body() data: UpdateProductQuantityDto,
    @User() user: UserEntity,
  ) {
    return await this.BasketService.UpdateQuantity(data, product_id, user);
  }
}
