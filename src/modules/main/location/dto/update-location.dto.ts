import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty(({ required: true }))
  @IsOptional()
  locationName: string;

  @ApiProperty(({ required: true }))
  @IsOptional()
  cityName: string;

  @ApiProperty(({ required: true }))
  @IsOptional()
  car: number;

  @ApiProperty(({ required: true }))
  @IsOptional()
  motorCycle: number;

  @ApiProperty(({ required: true }))
  @IsOptional()
  availableCars: number;

  @ApiProperty(({ required: true }))
  @IsOptional()
  availableMotorCycles: number;

  @ApiProperty(({ required: true }))
  @IsOptional()
  address: string;

  @ApiProperty(({ required: true }))
  @IsOptional()
  coordinate: string;
}