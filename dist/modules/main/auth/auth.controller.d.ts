import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { UsersService } from '../users/users.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordProfileDto } from './dto/reset-password-profile.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
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
    refreshTokenUser(refreshTokenUserDto: RefreshAccessTokenDto): Promise<{
        access_token: string;
    }>;
    refreshTokenAdmin(refreshTokenUserDto: RefreshAccessTokenDto): Promise<{
        access_token: string;
    }>;
    revokeRefreshTokenUser(id: string): Promise<void>;
    revokeRefreshTokenAdmin(id: string): Promise<void>;
    sendEmailForgetPassword(body: ForgetPasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        statuCode: number;
        message: string;
    }>;
    resetPasswordProfile(email: string, body: ResetPasswordProfileDto): Promise<{
        statuCode: number;
        message: string;
    }>;
}
