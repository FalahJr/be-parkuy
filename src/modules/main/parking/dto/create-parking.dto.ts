import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Pengendara } from '../../../../entities/pengendara.entity';


export class CreateParkingDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  metode: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  nopol: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  jenis_kendaraan: string;

  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  waktu_masuk: string;

  @ApiProperty(({ required: false }))
  @IsOptional()
  waktu_keluar: string;

  @ApiProperty(({ required: false }))
  @IsOptional()
  pengendara: Pengendara;
}

export class FindParkingDto {
  @ApiProperty(({ required: false }))
  @IsOptional()
  @IsString()
  s: string;
}