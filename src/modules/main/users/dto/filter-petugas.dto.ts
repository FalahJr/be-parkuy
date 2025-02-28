import { IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class FilterPetugasDto {
  @ApiProperty(({ required: true }))
  @IsOptional()
  fullName: string;
}