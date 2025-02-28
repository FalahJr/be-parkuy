import { Pengendara } from '../../../../entities/pengendara.entity';
export declare class CreateParkingDto {
    metode: string;
    nopol: string;
    jenis_kendaraan: string;
    waktu_masuk: string;
    waktu_keluar: string;
    pengendara: Pengendara;
}
export declare class FindParkingDto {
    s: string;
}
