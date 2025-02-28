import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { RefreshToken } from '../../../../entities/refresh-token.entity';
export declare class RefreshTokenRepository extends Repository<RefreshToken> {
    createRefreshToken(user: User, ttl: number): Promise<RefreshToken>;
}
