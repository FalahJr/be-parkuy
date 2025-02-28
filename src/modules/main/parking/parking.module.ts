import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingRepository } from './repository/parking.repository';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingRepository]),
    LocationModule
  ],
  providers: [ParkingService],
  controllers: [ParkingController],
})
export class ParkingModule { }
