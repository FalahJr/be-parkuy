import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateStatusPengendaraDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  status: boolean;
}