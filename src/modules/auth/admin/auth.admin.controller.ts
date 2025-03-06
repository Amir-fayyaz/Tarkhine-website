import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('admin-Auth')
@Controller('api/v1/admin/auth')
export class AuthAdminController {
  constructor(private readonly AuthService: AuthAdminService) {}

  @Post('login')
  @ApiOperation({ summary: 'For admin login' })
  @ApiBody({ type: LoginDto, description: 'required fields' })
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Body() data: LoginDto) {
    const token = await this.AuthService.login(data);

    return { access_token: token };
  }
}
