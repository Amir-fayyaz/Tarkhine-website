import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from '../../entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from '../dto/address/create-address.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AddressAppService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly Address_Repository: Repository<AddressEntity>,
  ) {}

  public async AddNewAddress(data: CreateAddressDTO, user: UserEntity) {
    const newAddress = this.Address_Repository.create({ ...data, user });

    return await this.Address_Repository.save(newAddress);
  }
}
