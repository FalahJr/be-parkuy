import { User } from "src/entities/user.entity";
import { BaseEntity } from "typeorm";
export declare class RefreshToken extends BaseEntity {
    id_refresh: string;
    isRevoked: boolean;
    expired_at: Date;
    user: User;
}
