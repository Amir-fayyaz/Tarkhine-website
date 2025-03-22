import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddressAppService } from '../services/address.client.service';
import { CreateAddressDTO } from '../dto/address/create-address.dto';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/modules/auth/guards/User.guard';

@Controller('api/v1/client/address')
@ApiTags('client-address')
@ApiBearerAuth()
@UseGuards(UserGuard)
export class AddressAppController {
  constructor(private readonly AddressService: AddressAppService) {}

  @Post()
  @ApiOperation({ summary: 'For create new address' })
  @ApiBody({ type: CreateAddressDTO, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async AddNewAddress(
    @Body() data: CreateAddressDTO,
    @User() user: UserEntity,
  ) {
    return await this.AddressService.AddNewAddress(data, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUserAddress(@User() user: UserEntity) {
    return await this.AddressService.getUserAddress(user);
  }
}
