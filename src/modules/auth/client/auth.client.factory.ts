import { Injectable } from '@nestjs/common';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { ICreateUser } from '../interfaces/ICreateUser.interface';
import { FindUserByMobile } from '../interfaces/IFindUserByMobile.interface';
import { CreateUserDto } from 'src/modules/users/client/dto/create-user.dto';

@Injectable()
export class AuthAppFactory {
  private readonly Create: ICreateUser;
  private readonly FindUserByMobilePhone: FindUserByMobile;

  constructor(UserService: UserAppService) {
    this.Create = UserService;
    this.FindUserByMobilePhone = UserService;
  }

  public async CreateUser(data: CreateUserDto) {
    return await this.Create.CreateUser(data);
  }

  public async FindUserByMobile(mobile: string) {
    return await this.FindUserByMobilePhone.FindUserByMobile(mobile);
  }
}
