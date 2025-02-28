import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMobilePhone, IsNotEmpty, IsOptional } from 'class-validator';

export class SetupPetugasDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  fullName: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  cityName: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  address: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;
}
