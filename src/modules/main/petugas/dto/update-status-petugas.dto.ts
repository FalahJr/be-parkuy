import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateStatusPetugasDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  status: string;
}