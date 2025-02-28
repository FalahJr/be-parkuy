import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataPetugasService, } from './data-petugas.service';
import { DataPetugasController, } from './data-petugas.controller';
import { DataPetugasRepository } from './repository/data-petugas.repository';
import { UserRepository } from '../users/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataPetugasRepository, UserRepository]),
  ],
  providers: [DataPetugasService],
  controllers: [DataPetugasController],
  exports: [DataPetugasService],
})
export class DataPetugasModule { }
