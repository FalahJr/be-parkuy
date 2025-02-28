import { Petugas } from '../../../entities/petugas.entity';
import { FilterPetugasDto } from '../users/dto/filter-petugas.dto';
import { DataPetugasService } from './data-petugas.service';
import { UpdateLocationPetugasDto } from './dto/update-location-petugas.dto';
import { UpdatePetugasDto } from './dto/update-petugas.dto';
import { UpdateStatusPetugasDto } from './dto/update-status-petugas.dto';
export declare class DataPetugasController {
    private readonly dataPetugasService;
    constructor(dataPetugasService: DataPetugasService);
    scan(req: any): Promise<Petugas>;
    filterPetugas(filter: FilterPetugasDto): Promise<Petugas[]>;
    removePetugas(id_petugas: string): Promise<void>;
    getBerkasPetugas(): Promise<Petugas[]>;
    getBerkasPetugasId(id_petugas: string): Promise<Petugas>;
    berkasPetugasByName(fullName: string): Promise<any>;
    getPetugasByName(fullName: string): Promise<any>;
    updatePetugas(id_petugas: string, updatePetugasDto: UpdatePetugasDto): Promise<{
        statuCode: number;
        message: string;
    }>;
    updateLocationPetugas(id_petugas: string, updateLocationPetugasDto: UpdateLocationPetugasDto): Promise<{
        statuCode: number;
        message: string;
    }>;
    updateStatusPetugas(id_petugas: string, updateStatusPetugasDto: UpdateStatusPetugasDto): Promise<{
        statuCode: number;
        message: string;
    }>;
    filterParkingPetugas(id_petugas: string): Promise<{
        filter: Petugas;
    }>;
    filterListVehicles(id_petugas: string): Promise<{
        filter: Petugas;
    }>;
    listVehiclesByNopol(id_petugas: string, nopol: string): Promise<{
        filter: Petugas;
    }>;
    filterParkingHistory(id_petugas: string): Promise<Petugas>;
    parkingHistoryNopol(id_petugas: string, nopol: string): Promise<Petugas>;
    officerAcceptedLocation(id_petugas: string): Promise<Petugas>;
    getPetugasDiterima(): Promise<any>;
    getPetugasBelumDiterima(): Promise<any>;
    filteredPetugasLocation(search: string): Promise<Petugas>;
    filteredParkingOutNopol(id_petugas: string, nopol: string): Promise<{
        filter: Petugas;
    }>;
    filteredKendaraan(search: string): Promise<{
        filter: any;
    }>;
    listParkingByLocationName(locationName: string): Promise<{
        filter: Petugas[];
    }>;
    listParkingByLocationCityName(cityName: string): Promise<{
        filter: Petugas[];
    }>;
}
