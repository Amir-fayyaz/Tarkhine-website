import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateStarDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'product-id you want to star on it' })
  product_id: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'start must be at least 1' })
  @Max(5, { message: 'star should not be greater than 5' })
  @ApiProperty({ description: 'For rate foods' })
  star: number;
}
