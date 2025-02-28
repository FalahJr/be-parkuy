import { BaseEntity } from 'typeorm';
import { Petugas } from './petugas.entity';
export declare class Parking extends BaseEntity {
    id_parking: string;
    metode: string;
    nopol: string;
    jenis_kendaraan: string;
    petugas: Petugas;
    status_bayar: string;
    waktu_masuk: Date;
    update_at: Date;
}
