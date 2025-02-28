import { LocationInterface } from "./location-interface.interface";
import { UserInterface } from "./user-interface.interface";
export interface PetugasInterface {
    id_petugas?: string;
    fullName?: string;
    cityName?: string;
    address?: string;
    phone?: number;
    date?: Date;
    status?: string;
    status_bekerja?: string;
    locationIdLocation?: LocationInterface | string;
    userId?: UserInterface | string;
    created_at?: Date;
    update_at?: Date;
}
