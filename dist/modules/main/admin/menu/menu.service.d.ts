import { UserRepository } from "../../users/repository/user.repository";
import { LocationRepository } from "../../location/repository/location.repository";
import { DataPetugasRepository } from "../../petugas/repository/data-petugas.repository";
import { PengendaraRepository } from '../../pengendara/repository/pengendara.repository';
import { ParkingRepository } from "../../parking/repository/parking.repository";
import { Petugas } from "src/entities/petugas.entity";
export declare class MenuService {
    private readonly userRespository;
    private readonly locationRespository;
    private readonly dataPetugasRepository;
    private readonly pengendaraRepository;
    private readonly parkingRepository;
    constructor(userRespository: UserRepository, locationRespository: LocationRepository, dataPetugasRepository: DataPetugasRepository, pengendaraRepository: PengendaraRepository, parkingRepository: ParkingRepository);
    officerAcceptedLocationById(id_petugas: string): Promise<Petugas>;
    getBerkasPetugas(): Promise<Petugas[]>;
}
