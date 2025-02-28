import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  email: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  password: string;
}