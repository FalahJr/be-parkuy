import { PengendaraRepository } from './repository/pengendara.repository';
import { Pengendara } from '../../../entities/pengendara.entity';
export declare class PengendaraService {
    private readonly pengendaraRepository;
    constructor(pengendaraRepository: PengendaraRepository);
    getAllPengendara(): Promise<Pengendara[]>;
    getPengendaraByLocation(id_pengendara: string): Promise<Pengendara>;
    getPengendaraById(id_pengendara: string): Promise<Pengendara>;
    updatePengendara(id_pengendara: string, updatePengendaraDto: any): Promise<{
        statuCode: number;
        message: string;
    }>;
    updateStatusPengendara(id_pengendara: string, updateStatusPengendaraDto: any): Promise<{
        statuCode: number;
        message: string;
    }>;
    statusParkirPengendara(id_pengendara: string, updateStatusParkirPengendaraDto: any): Promise<{
        statuCode: number;
        message: string;
    }>;
}
