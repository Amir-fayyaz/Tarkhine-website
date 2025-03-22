import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty({})
  @ApiProperty({ example: 12_000 })
  TotalPrice: number;

  @IsString()
  @Max(200)
  @Min(4)
  @IsNotEmpty()
  @ApiProperty({ description: 'description About order' })
  description: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  address_id: number;
}
