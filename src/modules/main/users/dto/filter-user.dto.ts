import { IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiProperty(({ required: true }))
  @IsOptional()
  role: string;
}