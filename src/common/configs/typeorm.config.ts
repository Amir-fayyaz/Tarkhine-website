import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';
import { OtpEntity } from 'src/modules/auth/entities/otp.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
config();

const { DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_DATABASE } = process.env;
export const TypeOrmConfigs: TypeOrmModuleOptions = {
  type: 'mysql',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  database: DB_DATABASE,
  host: DB_HOST,
  entities: [OtpEntity, UserEntity, AdminEntity],
  synchronize: true,
};
