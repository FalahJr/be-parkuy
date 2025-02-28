import { BaseEntity } from 'typeorm';
import { Location } from './location.entity';
import { Parking } from './parking.entity';
import { User } from './user.entity';
export declare class Petugas extends BaseEntity {
    id_petugas: string;
    fullName: string;
    cityName: string;
    address: string;
    phone: string;
    date: Date;
    status: string;
    status_bekerja: string;
    location: Location;
    user: User;
    parking: Parking;
    create_at: Date;
    update_at: Date;
}
