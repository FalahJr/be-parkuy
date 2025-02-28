import { Pengendara } from 'src/entities/pengendara.entity';
import { Repository } from 'typeorm';
import { User } from '../../../../entities/user.entity';
export declare class PengendaraRepository extends Repository<Pengendara> {
    createPengendara(user: User): Promise<Pengendara>;
    getPengendara(): Promise<Pengendara[]>;
}
