import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Petugas } from '../../../entities/petugas.entity';
import { FilterPetugasDto } from '../users/dto/filter-petugas.dto';
import { DataPetugasRepository } from './repository/data-petugas.repository';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';
import { UserRepository } from '../users/repository/user.repository';
import { User } from 'src/entities/user.entity';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class DataPetugasService {
  constructor(
    @InjectRepository(DataPetugasRepository)
    @InjectRepository(UserRepository)
    private readonly dataPetugasRepository: DataPetugasRepository,
    private readonly userRepository: UserRepository
  ) { }

  async filterPetugas(filter: FilterPetugasDto): Promise<Petugas[]> {
    return await this.dataPetugasRepository.filterPetugas(filter);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }
    return user;
  }

  async getPetugasById(id_petugas: string): Promise<Petugas> {
    const petugas = await this.dataPetugasRepository.findOne(id_petugas, { relations: ['user'] });
    if (!petugas) {
      throw new NotFoundException(`Petugas with id ${id_petugas} is not found`);
    }
    return petugas;
  }

  async scan(@Request() req) {
    const petugas = await this.dataPetugasRepository.createQueryBuilder('petugas')
      .where('petugas.id_petugas = :id', { id: req.id_petugas })
      .innerJoinAndSelect('petugas.location', 'location')
    return petugas.getOne();

  }

  async listVehiclesById(id_petugas: string): Promise<Petugas> {
    const petugas = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .innerJoinAndSelect("petugas.parking", "parking")
      .orderBy("parking.waktu_masuk", "DESC")
      .where("petugas.id_petugas = :id", { id: id_petugas })
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" })

    if (!petugas) {
      throw new NotFoundException(`Petugas with id ${id_petugas} is not found`);
    }
    return petugas.getOne();
  }

  async listVehiclesByMethod(id_petugas: string): Promise<Petugas> {
    const petugas = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .innerJoinAndSelect("petugas.parking", "parking")
      .innerJoinAndSelect("parking.pengendara", "pengendara")
      .orderBy("parking.waktu_masuk", "DESC")
      .where("petugas.id_petugas = :id", { id: id_petugas })
      .andWhere("parking.metode = :metode", { metode: "Digital" })
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" })

    if (!petugas) {
      throw new NotFoundException(`Petugas with id ${id_petugas} is not found`);
    }
    return petugas.getOne();
  }

  async listVehiclesByNopol(id_petugas: string, nopol: string) {
    const petugas = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .innerJoinAndSelect("petugas.parking", "parking")
      .innerJoinAndSelect("parking.pengendara", "pengendara")
      .orderBy("parking.waktu_masuk", "DESC")
      .where("petugas.id_petugas = :id", { id: id_petugas })
      .andWhere("parking.nopol = :nopol", { nopol: nopol })
      .andWhere("parking.metode = :metode", { metode: "Digital" })
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" })

    if (!petugas) {
      throw new NotFoundException(`Petugas with id ${id_petugas} is not found`);
    }
    return petugas.getOne();
  }

  async filteredParkingHistory(id_petugas: string): Promise<Petugas> {
    const parking = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .innerJoinAndSelect("petugas.parking", "parking")
      .orderBy("parking.waktu_masuk", "DESC")
      .where("petugas.id_petugas = :id", { id: id_petugas })
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Sudah bayar" })

    if (!parking) {
      throw new NotFoundException(`Petugas with id ${id_petugas} is not found`);
    }
    return parking.getOne();
  }

  async parkingHistoryNopol(id_petugas: string, nopol: string): Promise<Petugas> {
    const parking = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .innerJoinAndSelect("petugas.parking", "parking")
      .orderBy("parking.waktu_masuk", "DESC")
      .where("petugas.id_petugas = :id", { id: id_petugas })
      .andWhere("parking.nopol = :nopol", { nopol: nopol })
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Sudah bayar" })

    if (!parking) {
      throw new NotFoundException(`Petugas with id ${id_petugas} is not found`);
    }
    return parking.getOne();
  }

  async updatePetugas(id_petugas: string, updatePetugasDto) {
    const { fullName, cityName, address, phone } = updatePetugasDto;

    const data = await this.getPetugasById(id_petugas);
    data.fullName = fullName;
    data.cityName = cityName;
    data.address = address;
    data.phone = phone;

    const save = await data.save();
    if (save) {
      return {
        statuCode: 200,
        message: 'Successfully'
      }
    }
  }

  async updateLocationPetugas(id_petugas: string, updateLocationPetugasDto) {
    const { location } = updateLocationPetugasDto;

    const data = await this.getPetugasById(id_petugas);
    data.location = location;

    const save = await data.save();
    if (save) {
      return {
        statuCode: 200,
        message: 'Successfully'
      }
    }
  }

  async updateStatusPetugas(id_petugas: string, updateStatusPetugasDto) {
    const { status } = updateStatusPetugasDto;

    const data = await this.getPetugasById(id_petugas);
    data.status = status;

    const save = await data.save();
    if (save) {
      return {
        statuCode: 200,
        message: 'Successfully'
      }
    }
  }

  async getPetugasDiterima() {
    const getPetugas = await this.dataPetugasRepository.query(
      'SELECT petugas.id_petugas, petugas.fullName, petugas.cityName, petugas.address, petugas.phone, petugas.date, petugas.status, petugas.status_bekerja, petugas.create_at, location.id_location, location.locationName,	user.id, user.email FROM petugas INNER JOIN user ON petugas.userId  = user.id LEFT JOIN location ON petugas.locationIdLocation = location.id_location WHERE petugas.status_bekerja = "Sudah diterima" ORDER BY petugas.create_at DESC',
    );

    return getPetugas;
  }

  async getPetugasBelumDiterima() {
    const getPetugas = await this.dataPetugasRepository.query(
      'SELECT petugas.id_petugas, petugas.fullName, petugas.cityName, petugas.address, petugas.phone, petugas.date, petugas.status, petugas.status_bekerja, petugas.create_at,	user.id, user.email FROM petugas INNER JOIN user ON petugas.userId = user.id WHERE petugas.status_bekerja = "Belum diterima" ORDER BY petugas.create_at DESC',
    );

    return getPetugas;
  }

  async officerAcceptedLocationById(id_petugas: string) {
    const petugas = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .leftJoinAndSelect("petugas.location", "location")
      .innerJoinAndSelect("petugas.user", "user")
      .orderBy("petugas.create_at", "DESC")
      .where("petugas.id_petugas = :id", { id: id_petugas })
      .andWhere("petugas.status_bekerja = :status_bekerja", { status_bekerja: "Sudah diterima" })

    return petugas.getOne();
  }

  async getBerkasPetugas() {
    const petugas = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.user", "user")
      .orderBy("petugas.create_at", "DESC")

    return petugas.getMany();
  }

  async getBerkasPetugasById(id_petugas: string): Promise<Petugas> {
    const petugas = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.user", "user")
      .where("petugas.id_petugas = :id", { id: id_petugas })

    if (!petugas) {
      throw new NotFoundException(`Petugas with id ${id_petugas} is not found`);
    }
    return petugas.getOne();
  }

  async getBerkasPetugasByName(
    fullName: string
  ) {
    let filteredResult;

    if (fullName) {
      filteredResult = await this.dataPetugasRepository.query(
        'SELECT petugas.id_petugas, petugas.fullName, petugas.cityName, petugas.address, petugas.phone, petugas.date, petugas.status, petugas.status_bekerja, petugas.create_at, user.id, user.email FROM petugas INNER JOIN user ON petugas.userId  = user.id WHERE SOUNDEX(SUBSTRING(petugas.fullName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))',
        [fullName.length, fullName, fullName.length],
      );
    }

    return filteredResult;

  }

  async getPetugasByName(
    fullName: string
  ) {
    let filteredResult;

    if (fullName) {
      filteredResult = await this.dataPetugasRepository.query(
        'SELECT petugas.id_petugas, petugas.fullName, petugas.cityName AS namaKota, petugas.address AS alamatPetugas, petugas.phone, petugas.date,	location.id_location, location.locationName, location.cityName, location.address, location.coordinate FROM petugas INNER JOIN user ON petugas.userId  = user.id LEFT JOIN location ON petugas.locationIdLocation = location.id_location WHERE SOUNDEX(SUBSTRING(petugas.fullName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))',
        [fullName.length, fullName, fullName.length],
      );
    }

    return filteredResult;

  }

  async removePetugas(id_petugas: string): Promise<void> {
    const result = await this.dataPetugasRepository.delete(id_petugas);
    if (result.affected == 0) {
      throw new NotFoundException(`Petugas with id ${id_petugas} is not found`);
    }
  }

  async filteredPetugasLocation(
    search: string,
  ) {
    let filteredResult;

    if (search) {
      filteredResult = await this.dataPetugasRepository.query(
        'SELECT petugas.id_petugas, petugas.fullName, petugas.cityName AS namaKota, petugas.address AS alamatPetugas, petugas.phone, petugas.date,	location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.address, location.coordinate, location.rate FROM petugas INNER JOIN location ON petugas.locationIdLocation = location.id_location WHERE SOUNDEX(SUBSTRING(location.cityName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))',
        [search.length, search, search.length],
      );
    }

    return filteredResult;

  }

  async filteredParkingOutNopol(id_petugas: string, nopol: string): Promise<Petugas> {
    const parking = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .innerJoinAndSelect("petugas.parking", "parking")
      .leftJoinAndSelect("parking.pengendara", "pengendara")
      .orderBy("parking.waktu_masuk", "DESC")
      .where("parking.nopol = :nopol", { nopol: nopol })
      .andWhere("petugas.id_petugas = :id", { id: id_petugas })
      .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" })

    if (!parking) {
      throw new NotFoundException(`Nopol ${nopol} is not found`);
    }
    return parking.getOne();
  }

  async listParkingByLocationName(locationName: string) {
    const parking = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .where("location.locationName = :locationName", { locationName: locationName })

    return parking.getMany();
  }

  async listParkingByLocationCityName(cityName: string) {
    const parking = await this.dataPetugasRepository
      .createQueryBuilder("petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .where("location.cityName = :cityName", { cityName: cityName })

    return parking.getMany();
  }

  async filteredKendaraan(
    search: string,
  ) {
    let filteredResult;

    if (search) {
      filteredResult = await this.dataPetugasRepository.query(
        'SELECT petugas.id_petugas, petugas.fullName, petugas.cityName AS namaKota, petugas.address AS alamatPetugas, petugas.phone, petugas.date, location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate, location.rate, parking.id_parking, parking.metode, parking.nopol, parking.jenis_kendaraan, parking.status_bayar, parking.waktu_masuk, parking.petugasIdPetugas FROM petugas INNER JOIN location ON petugas.locationIdLocation = location.id_location INNER JOIN parking ON parking.petugasIdPetugas = petugas.id_petugas WHERE SOUNDEX(SUBSTRING(parking.id_parking, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))',
        [search.length, search, search.length],
      );
    }

    return filteredResult;

  }

}
