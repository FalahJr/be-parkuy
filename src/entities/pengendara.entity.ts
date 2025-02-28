import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Parking } from './parking.entity';
import { User } from './user.entity';

@Entity()
export class Pengendara extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_pengendara: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  cityName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  nopol: string;

  @Column({ nullable: true })
  jenis_kendaraan: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: "Tidak parkir" })
  status_parkir: string;

  @OneToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Parking, parking => parking.pengendara, { cascade: true })
  parking: Parking;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" })
  update_at: Date;
}
