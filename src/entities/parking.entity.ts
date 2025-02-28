import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pengendara } from './pengendara.entity';
import { Petugas } from './petugas.entity';
import { User } from './user.entity';

@Entity()
export class Parking extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_parking: string;

  @Column()
  metode: string;

  @Column()
  nopol: string;

  @Column()
  jenis_kendaraan: string;

  @ManyToOne(() => Petugas, petugas => petugas.id_petugas)
  petugas: Petugas;

  @ManyToOne(() => Pengendara, pengendara => pengendara.id_pengendara)
  pengendara: Pengendara;

  @Column({ default: "Belum bayar" })
  status_bayar: string;

  @Column()
  waktu_masuk: string;

  @Column({ nullable: true })
  waktu_keluar: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" })
  update_at: Date;

}
