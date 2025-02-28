import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class SetupPengendaraDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  fullName: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  cityName: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  address: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  nopol: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  jenis_kendaraan: string;
}
