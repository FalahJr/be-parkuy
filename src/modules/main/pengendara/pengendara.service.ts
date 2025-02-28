import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PengendaraRepository } from './repository/pengendara.repository';
import { Pengendara } from '../../../entities/pengendara.entity';

@Injectable()
export class PengendaraService {
  constructor(
    @InjectRepository(PengendaraRepository)
    private readonly pengendaraRepository: PengendaraRepository
  ) { }

  async getAllPengendara() {
    const pengendara = await this.pengendaraRepository
      .createQueryBuilder("pengendara")
      .orderBy("pengendara.create_at", "DESC")

    return pengendara.getMany();
  }

  async getPengendaraByLocation(id_pengendara: string): Promise<Pengendara> {
    const pengendara = await this.pengendaraRepository
      .createQueryBuilder("pengendara")
      .innerJoinAndSelect("pengendara.parking", "parking")
      .innerJoinAndSelect("parking.petugas", "petugas")
      .innerJoinAndSelect("petugas.location", "location")
      .where("pengendara.id_pengendara = :id", { id: id_pengendara })

    if (!pengendara) {
      throw new NotFoundException(`Pengendara with id ${id_pengendara} is not found`);
    }
    return pengendara.getOne();
  }

  async getPengendaraById(id_pengendara: string): Promise<Pengendara> {
    const pengendara = await this.pengendaraRepository
      .createQueryBuilder("pengendara")
      .innerJoinAndSelect("pengendara.user", "user")
      .orderBy("pengendara.create_at", "DESC")
      .where("pengendara.id_pengendara = :id", { id: id_pengendara })

    if (!pengendara) {
      throw new NotFoundException(`Pengendara with id ${id_pengendara} is not found`);
    }
    return pengendara.getOne();
  }

  async updatePengendara(id_pengendara: string, updatePengendaraDto) {
    const { fullName, cityName, address, phone, nopol, jenis_kendaraan } = updatePengendaraDto;

    const data = await this.getPengendaraById(id_pengendara);
    data.fullName = fullName;
    data.cityName = cityName;
    data.address = address;
    data.phone = phone;
    data.nopol = nopol;
    data.jenis_kendaraan = jenis_kendaraan;

    const save = await data.save();
    if (save) {
      return {
        statuCode: 200,
        message: 'Successfully'
      }
    }
  }

  async updateStatusPengendara(id_pengendara: string, updateStatusPengendaraDto) {
    const { status } = updateStatusPengendaraDto;

    const data = await this.getPengendaraById(id_pengendara);
    data.status = status;

    const save = await data.save();
    if (save) {
      return {
        statuCode: 200,
        message: 'Successfully update'
      }
    }
  }

  async statusParkirPengendara(id_pengendara: string, updateStatusParkirPengendaraDto) {
    const { status_parkir } = updateStatusParkirPengendaraDto;

    const data = await this.getPengendaraById(id_pengendara);
    data.status_parkir = status_parkir;

    const save = await data.save();
    if (save) {
      return {
        statuCode: 200,
        message: 'Successfully update'
      }
    }
  }
}
