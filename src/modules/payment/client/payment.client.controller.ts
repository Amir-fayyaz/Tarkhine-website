import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentAppService } from './payment.client.service';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { RequestPayment } from './dto/requestPayment.dto';

@Controller('api/v1/client/payment')
@ApiTags('client-payment')
@ApiBearerAuth()
@UseGuards(UserGuard)
export class PaymnetAppController {
  constructor(private readonly PaymentService: PaymentAppService) {}

  @Post('request')
  @ApiOperation({ summary: 'For create request-payment for user' })
  @ApiBody({ type: RequestPayment })
  @HttpCode(HttpStatus.OK)
  async requestPayment(@Body() data: RequestPayment, @User() user: UserEntity) {
    return await this.PaymentService.requestPayment(data, user);
  }
}
