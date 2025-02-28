import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateStatusParkirPengendaraDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  status_parkir: string;
}