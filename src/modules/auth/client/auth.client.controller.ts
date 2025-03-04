import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthAppService } from './auth.client.service';
import { SignUpDto } from './dto/signUp.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('client-Auth')
@Controller('api/v1/client/auth')
export class AuthAppController {
  constructor(
    private readonly AuthService: AuthAppService,
    private readonly JwtService: JwtService,
  ) {}

  //GET -
  @Get('getOtp')
  @ApiOperation({ summary: 'For get otp to login/register' })
  @ApiBody({ type: SignUpDto, description: 'required fields' })
  @HttpCode(HttpStatus.OK)
  async getOtp(@Body() data: SignUpDto) {
    return await this.AuthService.createOtp(data.mobile);
  }

  @Post('SignIn')
  @ApiBody({ type: SignInDto, description: 'required fields for SignIn' })
  @ApiOperation({ summary: 'For SignIn intp web app & recive jwt' })
  @HttpCode(HttpStatus.CREATED)
  async SignIn(@Body() SignInDto: SignInDto) {
    await this.AuthService.VerifyOtp(SignInDto);

    const userToken = await this.AuthService.getUser(SignInDto);

    return { access_token: userToken };
  }
}
