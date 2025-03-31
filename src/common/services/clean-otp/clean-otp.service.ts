import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from 'src/modules/auth/entities/otp.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class RemoveExpireOtpService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly Otp_Repository: Repository<OtpEntity>,
  ) {}

  private readonly Logger = new Logger(RemoveExpireOtpService.name);

  private async removeExpiredOtp(): Promise<number> {
    const deleteResult = await this.Otp_Repository.delete({
      expireAt: LessThan(new Date(Date.now())),
    });

    return deleteResult.affected || 0;
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  public async CleanUpOtp() {
    this.Logger.debug('Starting clean-up otps...');

    try {
      const deletedCount = await this.removeExpiredOtp();
      if (deletedCount > 0)
        this.Logger.log(`Successfully deleted ${deletedCount} expired OTPs`);
      else this.Logger.debug('No expired otps found');
    } catch (error) {
      this.Logger.error('Failed to clean up expired OTPs', error.stack);
    }
  }
}
