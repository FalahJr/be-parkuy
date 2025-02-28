import { BaseEntity } from 'typeorm';
import { Parking } from './parking.entity';
import { User } from './user.entity';
export declare class Pengendara extends BaseEntity {
    id_pengendara: string;
    fullName: string;
    phone: string;
    cityName: string;
    address: string;
    nopol: string;
    jenis_kendaraan: string;
    status: boolean;
    status_parkir: string;
    user: User;
    parking: Parking;
    create_at: Date;
    update_at: Date;
}
