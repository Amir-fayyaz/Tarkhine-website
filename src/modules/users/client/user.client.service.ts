import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserAppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User_Repository: Repository<UserEntity>,
  ) {}

  //exports methods
  public async FindUserByMobile(mobile: string) {
    return await this.User_Repository.findOne({
      where: {
        mobile,
      },
    });
  }

  public async CreateUser(data: CreateUserDto) {
    const newUser = this.User_Repository.create(data);

    return await this.User_Repository.save(newUser);
  }

  public async FindUserById(id: number) {
    return await this.User_Repository.findOne({
      where: { id },
    });
  }
}
