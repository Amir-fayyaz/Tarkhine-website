import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class UpdateProductQuantityDto {
  @IsInt()
  @IsPositive()
  @Max(100)
  @Min(1)
  @ApiProperty({ example: 1, minimum: 1, maximum: 100 })
  quantity: number;
}
