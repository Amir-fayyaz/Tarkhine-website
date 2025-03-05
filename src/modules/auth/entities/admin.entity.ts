import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('admins')
export class AdminEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;
}
