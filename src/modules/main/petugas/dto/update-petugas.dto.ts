import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePetugasDto {
  @ApiProperty(({ required: false }))
  @IsString()
  fullName: string;

  @ApiProperty(({ required: false }))
  @IsString()
  cityName: string;

  @ApiProperty(({ required: false }))
  @IsString()
  address: string;

  @ApiProperty(({ required: false }))
  @IsString()
  phone: string;
}