import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBerkasPetugasDto {
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
