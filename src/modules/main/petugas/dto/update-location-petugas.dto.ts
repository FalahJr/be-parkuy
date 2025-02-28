import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Location } from '../../../../entities/location.entity';

export class UpdateLocationPetugasDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  location: Location;
}