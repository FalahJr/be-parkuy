import { Petugas } from '../../../entities/petugas.entity';
import { FilterPetugasDto } from '../users/dto/filter-petugas.dto';
import { DataPetugasRepository } from './repository/data-petugas.repository';
import { UserRepository } from '../users/repository/user.repository';
import { User } from 'src/entities/user.entity';
export declare class DataPetugasService {
    private readonly dataPetugasRepository;
    private readonly userRepository;
    constructor(dataPetugasRepository: DataPetugasRepository, userRepository: UserRepository);
    filterPetugas(filter: FilterPetugasDto): Promise<Petugas[]>;
    getUserById(id: string): Promise<User>;
    getPetugasById(id_petugas: string): Promise<Petugas>;
    scan(req: any): Promise<Petugas>;
    listVehiclesById(id_petugas: string): Promise<Petugas>;
    listVehiclesByMethod(id_petugas: string): Promise<Petugas>;
    listVehiclesByNopol(id_petugas: string, nopol: string): Promise<Petugas>;
    filteredParkingHistory(id_petugas: string): Promise<Petugas>;
    parkingHistoryNopol(id_petugas: string, nopol: string): Promise<Petugas>;
    updatePetugas(id_petugas: string, updatePetugasDto: any): Promise<{
        statuCode: number;
        message: string;
    }>;
    updateLocationPetugas(id_petugas: string, updateLocationPetugasDto: any): Promise<{
        statuCode: number;
        message: string;
    }>;
    updateStatusPetugas(id_petugas: string, updateStatusPetugasDto: any): Promise<{
        statuCode: number;
        message: string;
    }>;
    getPetugasDiterima(): Promise<any>;
    getPetugasBelumDiterima(): Promise<any>;
    officerAcceptedLocationById(id_petugas: string): Promise<Petugas>;
    getBerkasPetugas(): Promise<Petugas[]>;
    getBerkasPetugasById(id_petugas: string): Promise<Petugas>;
    getBerkasPetugasByName(fullName: string): Promise<any>;
    getPetugasByName(fullName: string): Promise<any>;
    removePetugas(id_petugas: string): Promise<void>;
    filteredPetugasLocation(search: string): Promise<any>;
    filteredParkingOutNopol(id_petugas: string, nopol: string): Promise<Petugas>;
    listParkingByLocationName(locationName: string): Promise<Petugas[]>;
    listParkingByLocationCityName(cityName: string): Promise<Petugas[]>;
    filteredKendaraan(search: string): Promise<any>;
}
