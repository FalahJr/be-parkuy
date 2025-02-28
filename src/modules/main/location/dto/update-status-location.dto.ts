import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateStatusLocationDto {
  @ApiProperty(({ required: true }))
  @IsOptional()
  status: boolean;
}
