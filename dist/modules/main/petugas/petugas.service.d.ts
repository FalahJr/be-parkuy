import { Petugas } from '../../../entities/petugas.entity';
import { FilterPetugasDto } from '../users/dto/filter-petugas.dto';
import { PetugasRepository } from './repository/petugas.repository';
export declare class PetugasService {
    private readonly petugasRepository;
    constructor(petugasRepository: PetugasRepository);
    filterPetugas(filter: FilterPetugasDto): Promise<Petugas[]>;
    getPetugasById(id_petugas: string): Promise<Petugas>;
}
