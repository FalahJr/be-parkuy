import { Pengendara } from 'src/entities/pengendara.entity';
import { UpdatePengendaraDto } from './dto/update-pengendara.dto';
import { PengendaraService } from './pengendara.service';
import { UpdateStatusParkirPengendaraDto } from './dto/update-status-parkir-pengendara.dto';
import { UpdateStatusPengendaraDto } from './dto/update-status-pengendara.dto';
export declare class PengendaraController {
    private readonly pengendaraService;
    constructor(pengendaraService: PengendaraService);
    getPengendara(): Promise<Pengendara[]>;
    getPengendaraById(id_pengendara: string): Promise<Pengendara>;
    getPengendaraByLocation(id_pengendara: string): Promise<Pengendara>;
    updatePengendara(id_pengendara: string, updatePengendaraDto: UpdatePengendaraDto): Promise<{
        statuCode: number;
        message: string;
    }>;
    updateStatusPetugas(id_pengendara: string, updateStatusPengendaraDto: UpdateStatusPengendaraDto): Promise<{
        statuCode: number;
        message: string;
    }>;
    statusParkir(id_pengendara: string, updateStatusParkirPengendaraDto: UpdateStatusParkirPengendaraDto): Promise<{
        statuCode: number;
        message: string;
    }>;
}
