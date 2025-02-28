import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Request } from '@nestjs/common';
import { Parking } from 'src/entities/parking.entity';
import { CreateParkingDto } from '../dto/create-parking.dto';

@EntityRepository(Parking)
export class ParkingRepository extends Repository<Parking> {
  async createParking(createParkingDto: CreateParkingDto, @Request() req): Promise<Parking> {
    const {
      metode,
      nopol,
      jenis_kendaraan,
      waktu_masuk,
      pengendara
    } = createParkingDto;

    const data = this.create();
    data.petugas = req;
    data.metode = metode;
    data.nopol = nopol;
    data.jenis_kendaraan = jenis_kendaraan;
    data.waktu_masuk = waktu_masuk;
    data.pengendara = pengendara;

    try {
      return await data.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

  }

}
