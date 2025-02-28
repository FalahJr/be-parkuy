import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/modules/main/users/users.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    private readonly refreshTokenRepository;
    constructor(jwtService: JwtService, usersService: UsersService, refreshTokenRepository: RefreshTokenRepository);
    loginPengendara(loginUserDto: LoginUserDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id_pengendara: string;
            access_token: string;
            refresh_token: string;
            emailVerified: boolean;
            status: boolean;
            status_parkir: string;
        };
    }>;
    loginPetugas(loginUserDto: LoginUserDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id_petugas: string;
            access_token: string;
            refresh_token: string;
            emailVerified: boolean;
            status_petugas: string;
            status_bekerja: string;
        };
    }>;
    loginAdmin(loginAdminDto: LoginAdminDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            username: string;
            access_token: string;
            refresh_token: string;
        };
    }>;
    refreshAccessToken(refreshTokenDto: RefreshAccessTokenDto): Promise<{
        access_token: string;
    }>;
    decodeToken(token: string): Promise<any>;
    createAccessToken(user: User): Promise<string>;
    createRefreshToken(user: User): Promise<string>;
    revokeRefreshToken(id: string): Promise<void>;
}
