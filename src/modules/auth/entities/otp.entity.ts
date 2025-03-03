import { Base } from 'src/common/abstracts/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity('otp')
export class OtpEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  mobile: string;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'timestamp', nullable: false })
  expireAt: Date;

  @BeforeInsert()
  @BeforeInsert()
  setExpiresAt() {
    this.expireAt = new Date(Date.now() + 2 * 60 * 1000);
  }
}
