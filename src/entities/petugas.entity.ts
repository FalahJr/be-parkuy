import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Location } from './location.entity';
import { Parking } from './parking.entity';
import { User } from './user.entity';

@Entity()
export class Petugas extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_petugas: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  cityName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  // @Column()
  // photo: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ default: "Offline" })
  status: string;

  @Column({ default: "Belum diterima" })
  status_bekerja: string;

  @OneToOne(() => Location, location => location.id_location)
  @JoinColumn()
  location: Location;

  @OneToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Parking, parking => parking.petugas, { cascade: true })
  parking: Parking;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" })
  update_at: Date;
}
