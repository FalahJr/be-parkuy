import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateLocationDto {
  @ApiProperty(({ required: true }))
  @IsString()
  locationName: string;

  @ApiProperty(({ required: true }))
  @IsString()
  cityName: string;

  @ApiProperty(({ required: true }))
  @IsNumber()
  car: number;

  @ApiProperty(({ required: true }))
  @IsNumber()
  motorCycle: number;

  @ApiProperty(({ required: true }))
  @IsNumber()
  availableCars: number;

  @ApiProperty(({ required: true }))
  @IsNumber()
  availableMotorCycles: number;

  @ApiProperty(({ required: true }))
  @IsString()
  address: string;

  @ApiProperty(({ required: true }))
  @IsString()
  coordinate: string;

  @ApiProperty(({ required: true }))
  @IsNumber()
  rate: number;
}

export class FindLocationDto {
  @ApiProperty(({ required: false }))
  @IsOptional()
  @IsString()
  s: string;
}