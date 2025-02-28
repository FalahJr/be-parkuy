import { UserRepository } from "../../users/repository/user.repository";
import { LocationRepository } from "../../location/repository/location.repository";
import { DataPetugasRepository } from "../../petugas/repository/data-petugas.repository";
import { PengendaraRepository } from '../../pengendara/repository/pengendara.repository';
import { ParkingRepository } from "../../parking/repository/parking.repository";
export declare class DashboardService {
    private readonly userRespository;
    private readonly locationRespository;
    private readonly dataPetugasRepository;
    private readonly pengendaraRepository;
    private readonly parkingRepository;
    constructor(userRespository: UserRepository, locationRespository: LocationRepository, dataPetugasRepository: DataPetugasRepository, pengendaraRepository: PengendaraRepository, parkingRepository: ParkingRepository);
    getDashboards(): Promise<{
        message: string;
        total: {
            user: number;
            location: number;
            petugas: number;
            pengendara: number;
        };
    }>;
    getPetugasDashboards(search: string): Promise<any>;
    getTotalTransaction(search: string, status_bayar: string): Promise<any>;
}
