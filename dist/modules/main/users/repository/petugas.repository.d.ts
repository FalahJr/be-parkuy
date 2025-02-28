import { Petugas } from 'src/entities/petugas.entity';
import { Repository } from 'typeorm';
import { User } from '../../../../entities/user.entity';
import { FilterPetugasDto } from '../dto/filter-petugas.dto';
export declare class PetugasRepository extends Repository<Petugas> {
    createPetugas(user: User): Promise<Petugas>;
    filterPetugas(filter: FilterPetugasDto): Promise<Petugas[]>;
}
