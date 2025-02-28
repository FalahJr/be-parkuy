"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_config_1 = require("../config/jwt.config");
const users_service_1 = require("../users/users.service");
const refresh_token_repository_1 = require("./repository/refresh-token.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(jwtService, usersService, refreshTokenRepository) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Email atau Kata Sandi anda salah');
        }
        const access_token = await this.createAccessToken(user);
        const refresh_token = await this.createRefreshToken(user);
        return { access_token, refresh_token };
    }
    async refreshAccessToken(refreshTokenDto) {
        const { refresh_token } = refreshTokenDto;
        const payload = await this.decodeToken(refresh_token);
        const refreshToken = await this.refreshTokenRepository.findOne(payload.jid, { relations: ['user'] });
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token is not found');
        }
        if (refreshToken.isRevoked) {
            throw new common_1.UnauthorizedException('Refresh token has beed revoked');
        }
        const access_token = await this.createAccessToken(refreshToken.user);
        return { access_token };
    }
    async decodeToken(token) {
        try {
            return await this.jwtService.verifyAsync(token);
        }
        catch (e) {
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new common_1.UnauthorizedException('Refresh token is expired');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to decode token');
            }
        }
    }
    async createAccessToken(user) {
        const payload = {
            sub: user.id
        };
        const access_token = await this.jwtService.signAsync(payload);
        return access_token;
    }
    async createRefreshToken(user) {
        const refreshToken = await this.refreshTokenRepository.createRefreshToken(user, +jwt_config_1.refreshTokenConfig.expiresIn);
        const payload = {
            jid: refreshToken.id,
        };
        const refresh_token = await this.jwtService.signAsync(payload, jwt_config_1.refreshTokenConfig);
        return refresh_token;
    }
    async revokeRefreshToken(id) {
        const refreshToken = await this.refreshTokenRepository.findOne(id);
        if (!refreshToken) {
            throw new common_1.NotFoundException('Refresh token is not found');
        }
        refreshToken.isRevoked = true;
        await refreshToken.save();
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(refresh_token_repository_1.RefreshTokenRepository)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        refresh_token_repository_1.RefreshTokenRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map