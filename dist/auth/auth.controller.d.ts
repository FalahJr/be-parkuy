import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<LoginResponse>;
    refreshToken(refreshTokenDto: RefreshAccessTokenDto): Promise<{
        access_token: string;
    }>;
    revokeRefreshToken(id: string): Promise<void>;
}
