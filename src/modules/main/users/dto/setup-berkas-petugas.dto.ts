import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class SetupBerkasPetugasDto {
  @ApiProperty(({ required: true }))
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
