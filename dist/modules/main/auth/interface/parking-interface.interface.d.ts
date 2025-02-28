import { PetugasInterface } from "./petugas-interface.interface";
export interface ParkingInterface {
    id_parking?: string;
    metode?: string;
    nopol?: string;
    jenis_kendaraan?: string;
    petugasIdPetugas?: PetugasInterface | string;
    status_bayar?: string;
    created_at?: Date;
    update_at?: Date;
}
