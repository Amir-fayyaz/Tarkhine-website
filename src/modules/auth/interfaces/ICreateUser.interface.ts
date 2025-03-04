import { CreateUserDto } from 'src/modules/users/client/dto/create-user.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export interface ICreateUser {
  CreateUser(data: CreateUserDto): Promise<UserEntity>;
}
