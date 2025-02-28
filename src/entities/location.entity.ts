import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
import { Petugas } from './petugas.entity';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_location: string;

  @Column()
  locationName: string;

  @Column()
  cityName: string;

  @Column()
  car: number;

  @Column()
  availableCars: number;

  @Column()
  motorCycle: number;

  @Column()
  availableMotorCycles: number;

  @Column()
  address: string;

  @Column()
  coordinate: string;

  @Column()
  rate: number;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" })
  update_at: Date;

  @OneToOne(() => Petugas, petugas => petugas.location, { cascade: true })
  petugas: Petugas;

  @ManyToOne(() => Admin, admin => admin.id_admin)
  admin: Admin;
}
