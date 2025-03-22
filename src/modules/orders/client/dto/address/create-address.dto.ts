import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({ example: '23.586464' })
  latitude: string;

  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({ example: '56.900213' })
  longitude: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;
}
