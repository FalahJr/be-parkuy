import { Pengendara } from 'src/entities/pengendara.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../../entities/user.entity';

@EntityRepository(Pengendara)
export class PengendaraRepository extends Repository<Pengendara> {
  async createPengendara(user: User) {
    const Pengendara = this.create();
    Pengendara.user = user;

    return await Pengendara.save();
  }

  async getPengendara(): Promise<Pengendara[]> {
    const query = this.createQueryBuilder('data');
    return await query.getMany();
  }
}