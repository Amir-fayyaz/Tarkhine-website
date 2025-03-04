import { UserEntity } from 'src/modules/users/entities/user.entity';

export interface FindUserByMobile {
  FindUserByMobile(mobile: string): Promise<UserEntity>;
}
