import { BaseEntity } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { Admin } from './admin.entity';
import { Petugas } from './petugas.entity';
import { Pengendara } from './pengendara.entity';
export declare class User extends BaseEntity {
    id: string;
    username: string;
    email: string;
    password: string;
    salt: string;
    role: string;
    emailVerified: boolean;
    create_at: Date;
    update_at: Date;
    refreshTokens: RefreshToken[];
    admin: Admin;
    petugas: Petugas;
    pengendara: Pengendara;
    validatePassword(password: string): Promise<boolean>;
}
