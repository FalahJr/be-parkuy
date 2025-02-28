import { Petugas } from 'src/entities/petugas.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../../entities/user.entity';
import { FilterPetugasDto } from '../dto/filter-petugas.dto';

@EntityRepository(Petugas)
export class DataPetugasRepository extends Repository<Petugas> {
  async createPetugas(user: User) {
    const Petugas = this.create();
    Petugas.user = user;

    return await Petugas.save();
  }

  async filterPetugas(filter: FilterPetugasDto): Promise<Petugas[]> {
    const { fullName } = filter;

    const query = this.createQueryBuilder('data');

    if (fullName) {
      query.andWhere('lower(data.fullName) LIKE :fullName', {
        fullName: `%${fullName.toLowerCase()}%`,
      });
    }

    return await query.getMany();
  }

  async getPetugasDiterima(): Promise<Petugas[]> {
    const query = this.createQueryBuilder('data')
    return await query.getMany();
  }

  async getPetugasBelumDiterima(): Promise<Petugas[]> {
    const query = this.createQueryBuilder('data')
    return await query.getMany();
  }
}