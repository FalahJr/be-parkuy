import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength
} from 'class-validator';

export class CreatePengendaraDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
