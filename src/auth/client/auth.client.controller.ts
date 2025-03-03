import { Controller } from '@nestjs/common';
import { AuthAppService } from './auth.client.service';

@Controller('api/v1/client/auth')
export class AuthAppController {
  constructor(private readonly AuthService: AuthAppService) {}
}
