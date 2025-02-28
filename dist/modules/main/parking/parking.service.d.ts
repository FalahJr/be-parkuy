import { CreateParkingDto } from './dto/create-parking.dto';
import { ParkingRepository } from './repository/parking.repository';
import { Parking } from '../../../entities/parking.entity';
export declare class ParkingService {
    private readonly parkingRepository;
    constructor(parkingRepository: ParkingRepository);
    createParking(createParkingDto: CreateParkingDto, req: any): Promise<{
        status: number;
        message: string;
        data: {
            metode: string;
            nopol: string;
            jenis_kendaraan: string;
            waktu_masuk: string;
            petugas: string;
            id_petugas: string;
        };
    }>;
    updateParking(id_parking: string, updateParkingDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    payForParking(id_parking: string, payForParkingDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    getParkingById(id_parking: string): Promise<Parking>;
    getParkingEntrance(): Promise<Parking[]>;
    getParkingEntranceById(id_parking: string): Promise<Parking>;
    getParkingOut(): Promise<Parking[]>;
    getParkingOutById(id_parking: string): Promise<Parking>;
}
