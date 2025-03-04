import { Base } from 'src/common/abstracts/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  mobile: string;

  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  ShowName: string;

  @Column({ type: 'date', nullable: true })
  birthDay: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  //relations
}
