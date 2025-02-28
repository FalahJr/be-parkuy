import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCapacityDto {
  @ApiProperty(({ required: false }))
  @IsOptional()
  availableCars: number;

  @ApiProperty(({ required: false }))
  @IsOptional()
  availableMotorCycles: number;
}