import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  fullName: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  cityName: string;

  // @ApiProperty(({ required: true }))
  // @IsNotEmpty()
  // status: boolean;
}
