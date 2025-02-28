import { Petugas } from '../../../entities/petugas.entity';
import { FilterPetugasDto } from '../users/dto/filter-petugas.dto';
import { PetugasService } from './petugas.service';
export declare class PetugasController {
    private readonly petugasService;
    constructor(petugasService: PetugasService);
    getPetugas(id: string): Promise<Petugas>;
    filterPetugas(filter: FilterPetugasDto): Promise<Petugas[]>;
}
