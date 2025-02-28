import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateParkingDto } from './dto/create-parking.dto';
import { ParkingRepository } from './repository/parking.repository';
import { Parking } from '../../../entities/parking.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(ParkingRepository)
    private readonly parkingRepository: ParkingRepository,
  ) { }

  async createParking(createParkingDto: CreateParkingDto, @Request() req) {
    const parking = await this.parkingRepository.createParking(createParkingDto, req);
    if (parking) {
      return {
        status: 201,
        message: 'Succesfully created parking data',
        data: {
          metode: parking.metode,
          nopol: parking.nopol,
          jenis_kendaraan: parking.jenis_kendaraan,
          waktu_masuk: parking.waktu_masuk,
          petugas: parking.petugas.fullName,
          id_petugas: parking.petugas.id_petugas
        }
      }
    }
  }

  async updateParking(id_parking: string, updateParkingDto) {
    const { nopol, jenis_kendaraan } = updateParkingDto;

    const data = await this.getParkingById(id_parking);
    data.nopol = nopol;
    data.jenis_kendaraan = jenis_kendaraan;

    const save = await data.save();
    if (save) {
      return {
        statusCode: 200,
        message: 'Successfully'
      }
    }
  }

  async payForParking(id_parking: string, payForParkingDto) {
    const { status_bayar, waktu_keluar } = payForParkingDto;

    const data = await this.getParkingById(id_parking);
    data.status_bayar = status_bayar;
    data.waktu_keluar = waktu_keluar;

    const save = await data.save();
    if (save) {
      return {
        statusCode: 200,
        message: 'Successfully'
      }
    }
  }

  async getParkingById(id_parking: string): Promise<Parking> {
    const data = await this.parkingRepository.findOne(id_parking);
    if (!data) {
      throw new NotFoundException(`Parking with id ${id_parking} is not found`);
    }
    return data;
  }

  async getParkingEntrance() {
    const parking = await this.parkingRepository
      .createQueryBuilder("parking")
      .innerJoinAndSelect("parking.petugas", "petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .orderBy("parking.create_at", "DESC")
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" })

    return parking.getMany();
  }

  async getParkingEntranceById(id_parking: string): Promise<Parking> {
    const parking = await this.parkingRepository
      .createQueryBuilder("parking")
      .innerJoinAndSelect("parking.petugas", "petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .leftJoinAndSelect("parking.pengendara", "pengendara")
      .leftJoinAndSelect("pengendara.user", "user")
      .where("parking.id_parking = :id", { id: id_parking })
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" })

    if (!parking) {
      throw new NotFoundException(`Petugas with id ${id_parking} is not found`);
    }
    return parking.getOne();
  }

  async getParkingOut() {
    const parking = await this.parkingRepository
      .createQueryBuilder("parking")
      .innerJoinAndSelect("parking.petugas", "petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .orderBy("parking.create_at", "DESC")
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Sudah bayar" })

    return parking.getMany();
  }

  async getParkingOutById(id_parking: string): Promise<Parking> {
    const parking = await this.parkingRepository
      .createQueryBuilder("parking")
      .innerJoinAndSelect("parking.petugas", "petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .leftJoinAndSelect("parking.pengendara", "pengendara")
      .leftJoinAndSelect("pengendara.user", "user")
      .where("parking.id_parking = :id", { id: id_parking })
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Sudah bayar" })

    if (!parking) {
      throw new NotFoundException(`Petugas with id ${id_parking} is not found`);
    }
    return parking.getOne();
  }
}
