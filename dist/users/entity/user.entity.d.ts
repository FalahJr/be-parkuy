import { BaseEntity } from 'typeorm';
import { RefreshToken } from '../../auth/entity/refresh-token.entity';
export declare class User extends BaseEntity {
    id: string;
    fullName: string;
    email: string;
    password: string;
    salt: string;
    phone: string;
    cityName: string;
    refreshTokens: RefreshToken[];
    validatePassword(password: string): Promise<boolean>;
}
