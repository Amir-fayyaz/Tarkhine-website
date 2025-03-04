import { Body, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthAppService } from './auth.client.service';
import { SignUpDto } from './dto/signUp.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('api/v1/client/auth')
export class AuthAppController {
  constructor(private readonly AuthService: AuthAppService) {}

  //GET -
  @Get('getOtp')
  @ApiOperation({ summary: 'For get otp to login/register' })
  @ApiBody({ type: SignUpDto, description: 'required fields' })
  @HttpCode(HttpStatus.OK)
  async getOtp(@Body() data: SignUpDto) {
    return await this.AuthService.createOtp(data.mobile);
  }
}
