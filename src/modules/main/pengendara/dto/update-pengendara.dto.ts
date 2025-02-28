import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePengendaraDto {
  @ApiProperty(({ required: false }))
  @IsString()
  fullName: string;

  @ApiProperty(({ required: false }))
  @IsString()
  phone: string;

  @ApiProperty(({ required: false }))
  @IsString()
  cityName: string;

  @ApiProperty(({ required: false }))
  @IsString()
  address: string;

  @ApiProperty(({ required: false }))
  @IsString()
  nopol: string;

  @ApiProperty(({ required: false }))
  @IsString()
  jenis_kendaraan: string;
}