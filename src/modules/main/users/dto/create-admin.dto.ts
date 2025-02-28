import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  username: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @MinLength(6)
  password: string;

}
