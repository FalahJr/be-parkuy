import { User } from "src/entities/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_refresh: string;

  @Column()
  isRevoked: boolean;

  @Column()
  expired_at: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
}