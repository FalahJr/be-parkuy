import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { LoginResponse } from './interface/login-response.interface';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    private readonly refreshTokenRepository;
    constructor(jwtService: JwtService, usersService: UsersService, refreshTokenRepository: RefreshTokenRepository);
    login(loginDto: LoginDto): Promise<LoginResponse>;
    refreshAccessToken(refreshTokenDto: RefreshAccessTokenDto): Promise<{
        access_token: string;
    }>;
    decodeToken(token: string): Promise<any>;
    createAccessToken(user: User): Promise<string>;
    createRefreshToken(user: User): Promise<string>;
    revokeRefreshToken(id: string): Promise<void>;
}
