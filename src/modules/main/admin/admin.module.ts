import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { UserRepository } from '../users/repository/user.repository';
import { DataPetugasRepository } from '../petugas/repository/data-petugas.repository';
import { LocationRepository } from '../location/repository/location.repository';
import { ParkingRepository } from '../parking/repository/parking.repository';
import { PengendaraRepository } from '../pengendara/repository/pengendara.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, LocationRepository, DataPetugasRepository, PengendaraRepository, ParkingRepository]),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class AdminModule { }
