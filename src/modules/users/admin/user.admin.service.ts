import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User_Repository: Repository<UserEntity>,
  ) {}

  public async getUsersCount() {
    const users = await this.User_Repository.find();

    return users.length ? { usersCount: users.length } : { users: 0 };
  }
}
