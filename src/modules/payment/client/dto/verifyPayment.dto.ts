import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerfiyPaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'TotalPrice of user-basket' })
  amount: number;
}
