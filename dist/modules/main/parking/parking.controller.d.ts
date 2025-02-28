import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { PayForParkingDto } from './dto/pay-for-parking.dto';
import { Parking } from 'src/entities/parking.entity';
import { UpdateParkingDto } from './dto/update-parking.dto';
export declare class ParkingController {
    private readonly parkingService;
    constructor(parkingService: ParkingService);
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
    updateParking(id_parking: string, updateParkingDto: UpdateParkingDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    bayarParkir(id_parking: string, payForParkingDto: PayForParkingDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    parkingEntrance(): Promise<Parking[]>;
    parkingEntranceById(id_parking: string): Promise<Parking>;
    parkingOut(): Promise<Parking[]>;
    parkingOutById(id_parking: string): Promise<Parking>;
}
