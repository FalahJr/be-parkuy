import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateParkingDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  nopol: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  jenis_kendaraan: string;
}