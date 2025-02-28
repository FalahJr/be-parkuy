import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from './refresh-token.entity';
import { Admin } from './admin.entity';
import { Exclude } from 'class-transformer';
import { Petugas } from './petugas.entity';
import { Pengendara } from './pengendara.entity';
import { Parking } from './parking.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  salt: string;

  @Column()
  role: string;

  @Column({ default: false })
  emailVerified: boolean;

  // @Column()
  // @IsString({ always: true })
  // photo: string;

  // @Column()
  // // @IsString({ always: true })
  // ktp_photo: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;


  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    eager: true,
  })
  refreshTokens: RefreshToken[];

  @OneToOne(() => Admin, (admin) => admin.user, {
    onDelete: 'CASCADE', eager: true,
  })
  admin: Admin;

  @OneToOne(() => Petugas, (petugas) => petugas.user, {
    onDelete: 'CASCADE', eager: true,
  })
  petugas: Petugas;

  @OneToOne(() => Pengendara, (pengendara) => pengendara.user, {
    onDelete: 'CASCADE', eager: true,
  })
  pengendara: Pengendara;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
