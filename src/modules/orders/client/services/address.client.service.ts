import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async getUserAddress(user: UserEntity) {
    return await this.Address_Repository.find({
      where: { user: { id: user.id } },
    });
  }

  public async deleteUserAddress(address_id: number, user_id: number) {
    const deleteResult = await this.Address_Repository.delete({
      id: address_id,
      user: { id: user_id },
    });

    if (deleteResult.affected === 0)
      throw new NotFoundException('There is no address For this user');

    return { success: true };
  }
}
