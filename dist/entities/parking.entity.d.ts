import { BaseEntity } from 'typeorm';
import { Pengendara } from './pengendara.entity';
import { Petugas } from './petugas.entity';
export declare class Parking extends BaseEntity {
    id_parking: string;
    metode: string;
    nopol: string;
    jenis_kendaraan: string;
    petugas: Petugas;
    pengendara: Pengendara;
    status_bayar: string;
    waktu_masuk: string;
    waktu_keluar: string;
    create_at: Date;
    update_at: Date;
}
