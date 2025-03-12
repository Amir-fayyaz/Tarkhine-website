import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'about food' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 250_000 })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'product-category' })
  category_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'product-subCategory' })
  subCategory_id: number;
}
