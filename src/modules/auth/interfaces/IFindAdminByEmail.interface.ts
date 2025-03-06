import { AdminEntity } from '../entities/admin.entity';

export interface IFindAdminByEmail {
  FindAdminByEmail(email: string): Promise<AdminEntity>;
}
