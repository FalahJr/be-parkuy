import { User } from "src/users/entity/user.entity";
import { BaseEntity } from "typeorm";
export declare class RefreshToken extends BaseEntity {
    id: string;
    isRevoked: boolean;
    expiredAt: Date;
    user: User;
}
