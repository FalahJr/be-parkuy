import { BaseEntity } from 'typeorm';
import { Admin } from './admin.entity';
import { Petugas } from './petugas.entity';
export declare class Location extends BaseEntity {
    id_location: string;
    locationName: string;
    cityName: string;
    car: number;
    availableCars: number;
    motorCycle: number;
    availableMotorCycles: number;
    address: string;
    coordinate: string;
    rate: number;
    status: boolean;
    create_at: Date;
    update_at: Date;
    petugas: Petugas;
    admin: Admin;
}
