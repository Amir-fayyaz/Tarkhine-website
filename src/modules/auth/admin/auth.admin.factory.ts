import { Injectable } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { IFindAdminByEmail } from '../interfaces/IFindAdminByEmail.interface';

@Injectable()
export class AuthAdminFactory {
  private readonly FindAdminByEmail: IFindAdminByEmail;

  constructor(AuthService: AuthAdminService) {
    this.FindAdminByEmail = AuthService;
  }

  public async FindAdmin(email: string) {
    return await this.FindAdminByEmail.FindAdminByEmail(email);
  }
}
