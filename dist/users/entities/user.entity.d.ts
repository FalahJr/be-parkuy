import { BaseEntity } from 'typeorm';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
export declare class User extends BaseEntity {
    id: string;
    fullName: string;
    email: string;
    password: string;
    salt: string;
    phone: string;
    cityName: string;
    create_at: Date;
    update_at: Date;
    refreshTokens: RefreshToken[];
    validatePassword(password: string): Promise<boolean>;
}
