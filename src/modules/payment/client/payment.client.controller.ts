import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentAppService } from './payment.client.service';
import { UserGuard } from 'src/modules/auth/guards/User.guard';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { RequestPaymentDto } from './dto/requestPayment.dto';
import { VerfiyPaymentDto } from './dto/verifyPayment.dto';

@Controller('api/v1/client/payment')
@ApiTags('client-payment')
@ApiBearerAuth()
@UseGuards(UserGuard)
export class PaymnetAppController {
  constructor(private readonly PaymentService: PaymentAppService) {}

  @Post('request')
  @ApiOperation({ summary: 'For create request-payment for user' })
  @ApiBody({ type: RequestPaymentDto })
  @HttpCode(HttpStatus.OK)
  async requestPayment(
    @Body() data: RequestPaymentDto,
    @User() user: UserEntity,
  ) {
    return await this.PaymentService.requestPayment(data, user);
  }

  @Post('verify')
  @ApiOperation({ description: 'For verify user payment' })
  @ApiQuery({
    name: 'Authority',
    type: String,
    example: 'S000000000000000000000000000000qymdq',
  })
  @ApiQuery({ name: 'Status', type: String, example: 'OK' })
  async verifyPayment(
    @Query('Authority') authority: string,
    @Query('Status') status: string,
    @Body() data: VerfiyPaymentDto,
  ) {
    console.log(authority, status, data.amount);
    if (status == 'OK') {
      const verifyResult = await this.PaymentService.verifyPayment(
        authority,
        data,
      );

      if (verifyResult.status == 100 || verifyResult.status == 101) {
        return { success: true, refId: verifyResult.refId };
      }
    }

    return { success: false };
  }
}
