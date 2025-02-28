import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../../users/repository/user.repository";
import { LocationRepository } from "../../location/repository/location.repository";
import { DataPetugasRepository } from "../../petugas/repository/data-petugas.repository";
import { PengendaraRepository } from '../../pengendara/repository/pengendara.repository';
import { ParkingRepository } from "../../parking/repository/parking.repository";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(UserRepository)
    @InjectRepository(LocationRepository)
    @InjectRepository(DataPetugasRepository)
    @InjectRepository(PengendaraRepository)
    @InjectRepository(ParkingRepository)
    private readonly userRespository: UserRepository,
    private readonly locationRespository: LocationRepository,
    private readonly dataPetugasRepository: DataPetugasRepository,
    private readonly pengendaraRepository: PengendaraRepository,
    private readonly parkingRepository: ParkingRepository
  ) { }

  async getDashboards() {
    const getTotalUsers = await this.userRespository.query(
      'SELECT COUNT(*) as totalUser FROM user',
    );

    const getTotalLocation = await this.locationRespository.query(
      'SELECT COUNT(*) as totalLocation FROM location',
    );

    const getTotalDataPetugas = await this.dataPetugasRepository.query(
      'SELECT COUNT(*) as totalPetugas FROM petugas',
    );

    const getTotalDataPengendara = await this.pengendaraRepository.query(
      'SELECT COUNT(*) as totalPengendara FROM pengendara',
    );

    const objResult = {
      message: 'get all total data successfully',
      total: {
        user: parseInt(getTotalUsers[0].totalUser),
        location: parseInt(getTotalLocation[0].totalLocation),
        petugas: parseInt(getTotalDataPetugas[0].totalPetugas),
        pengendara: parseInt(getTotalDataPengendara[0].totalPengendara),
      },
    };

    return objResult;
  }

  async getPetugasDashboards(
    search: string
  ) {
    let filteredResult;

    if (search) {
      filteredResult = await this.dataPetugasRepository.query(
        'SELECT petugas.id_petugas, petugas.fullName, petugas.cityName AS namaKota, petugas.address AS alamatPetugas, petugas.phone, petugas.date,	location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate, location.rate, user.email FROM petugas INNER JOIN location ON petugas.locationIdLocation = location.id_location INNER JOIN user ON petugas.userId = user.id WHERE SOUNDEX(SUBSTRING(petugas.id_petugas, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))',
        [search.length, search, search.length],
      );

    }
    return filteredResult;
  }

  async getTotalTransaction(
    search: string,
    status_bayar: string
  ) {
    let filteredResult;

    if (search && status_bayar) {
      filteredResult = await this.dataPetugasRepository.query(
        'SELECT petugas.id_petugas,	parking.id_parking, COUNT(parking.status_bayar) as totalTransaction FROM petugas INNER JOIN parking ON parking.petugasIdPetugas WHERE SOUNDEX(SUBSTRING(petugas.id_petugas, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?)) AND parking.status_bayar = ?',
        [search.length, search, search.length, status_bayar],
      ), parseInt(filteredResult[0].totalTransaction);

    }
    return filteredResult;
  }
}

