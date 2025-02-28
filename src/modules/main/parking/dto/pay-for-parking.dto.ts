import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PayForParkingDto {

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  status_bayar: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  waktu_keluar: string;
}