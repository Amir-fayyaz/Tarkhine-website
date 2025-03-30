import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddUserImageDto } from './dto/addUserImage.dto';

@Injectable()
export class UserAppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User_Repository: Repository<UserEntity>,
  ) {}

  public async getProfile(user: UserEntity) {
    return await this.User_Repository.findOne({
      where: { id: user.id },
      relations: ['address', 'coupons'],
    });
  }

  public async editProfile(id: number, data: UpdateUserDto) {
    const updateResult = await this.User_Repository.update(id, {
      ...data,
    });

    if (updateResult.affected === 0)
      throw new NotFoundException('There is no user with this id');

    return { success: true };
  }

  public async addUserImage(data: AddUserImageDto, user: UserEntity) {
    const updateResult = await this.User_Repository.update(user.id, {
      avatar: data.path,
    });

    if (updateResult.affected === 0)
      throw new NotFoundException('There is no user with this id');

    return { success: true };
  }
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
