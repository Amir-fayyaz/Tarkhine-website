import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserAdminService } from './user.admin.service';
import { AdminGuard } from 'src/modules/auth/guards/Admin.guard';

@Controller('api/v1/admin/users')
@ApiTags('admin-user')
@ApiHeader({ name: 'authorization' })
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class UserAdminController {
  constructor(private readonly UserService: UserAdminService) {}

  @Get('count')
  async getUsersCount() {
    return await this.UserService.getUsersCount();
  }
}
