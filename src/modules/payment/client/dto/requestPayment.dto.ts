import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class RequestPayment {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'totalPrice of basket' })
  amount: number;

  //   @Matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  callBackUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'description about payment (choose it random)' })
  description: string;
}
