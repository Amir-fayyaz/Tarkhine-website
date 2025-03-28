import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/modules/auth/enums/role.enum';

@Injectable()
export class IntializeSuperAdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly admin_Repository: Repository<AdminEntity>,
  ) {}
  private readonly Logger = new Logger(IntializeSuperAdminService.name);

  async createSuperAdmin() {
    let { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_USERNAME } = process.env;

    const superAdmin = await this.admin_Repository.findOne({
      where: {
        email: ADMIN_EMAIL,
        role: Role.SUPER_ADMIN,
      },
    });

    if (superAdmin) {
      this.Logger.log('super admin existed before !');
      return;
    }

    try {
      ADMIN_PASSWORD = await bcrypt.hash(ADMIN_PASSWORD, 10);

      const newSuperAdmin = this.admin_Repository.create({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: Role.SUPER_ADMIN,
      });

      await this.admin_Repository.save(newSuperAdmin);

      this.Logger.log('SuperAdmin initialized successfully');
    } catch (error) {
      this.Logger.error(error.message);
    }
  }
}
