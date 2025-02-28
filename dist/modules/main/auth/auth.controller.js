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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_admin_dto_1 = require("./dto/login-admin.dto");
const refresh_access_token_dto_1 = require("./dto/refresh-access-token.dto");
const users_service_1 = require("../users/users.service");
const forget_password_dto_1 = require("./dto/forget-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const jwt_guard_1 = require("../../../utils/jwt.guard");
const login_user_dto_1 = require("./dto/login-user.dto");
const reset_password_profile_dto_1 = require("./dto/reset-password-profile.dto");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async loginPengendara(loginUserDto) {
        return this.authService.loginPengendara(loginUserDto);
    }
    async loginPetugas(loginUserDto) {
        return this.authService.loginPetugas(loginUserDto);
    }
    async loginAdmin(loginAdminDto) {
        return this.authService.loginAdmin(loginAdminDto);
    }
    async refreshTokenUser(refreshTokenUserDto) {
        return this.authService.refreshAccessToken(refreshTokenUserDto);
    }
    async refreshTokenAdmin(refreshTokenUserDto) {
        return this.authService.refreshAccessToken(refreshTokenUserDto);
    }
    async revokeRefreshTokenUser(id) {
        return this.authService.revokeRefreshToken(id);
    }
    async revokeRefreshTokenAdmin(id) {
        return this.authService.revokeRefreshToken(id);
    }
    async sendEmailForgetPassword(body) {
        const sendLink = await this.usersService.sendForgetPasswordLink(body.email);
        return {
            statusCode: 201,
            message: 'Check your email for next step'
        };
    }
    async resetPassword(body) {
        const email = await this.usersService.decodeConfirmationToken(body.token);
        return await this.usersService.resetPassword(email, body);
    }
    async resetPasswordProfile(email, body) {
        return await this.usersService.resetPasswordProfile(email, body);
    }
};
__decorate([
    (0, common_1.Post)('login-pengendara'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginPengendara", null);
__decorate([
    (0, common_1.Post)('login-petugas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginPetugas", null);
__decorate([
    (0, common_1.Post)('login-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_admin_dto_1.LoginAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Post)('refresh-token-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_access_token_dto_1.RefreshAccessTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokenUser", null);
__decorate([
    (0, common_1.Post)('refresh-token-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_access_token_dto_1.RefreshAccessTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokenAdmin", null);
__decorate([
    (0, common_1.Patch)('/:id/revoke-user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revokeRefreshTokenUser", null);
__decorate([
    (0, common_1.Patch)('/:id/revoke-admin'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revokeRefreshTokenAdmin", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmailForgetPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('reset-password-profile'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_profile_dto_1.ResetPasswordProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPasswordProfile", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('/api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map