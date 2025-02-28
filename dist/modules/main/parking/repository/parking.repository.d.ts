import { Repository } from 'typeorm';
import { Parking } from 'src/entities/parking.entity';
import { CreateParkingDto } from '../dto/create-parking.dto';
export declare class ParkingRepository extends Repository<Parking> {
    createParking(createParkingDto: CreateParkingDto, req: any): Promise<Parking>;
}
