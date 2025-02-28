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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const filter_user_dto_1 = require("./dto/filter-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_service_1 = require("./users.service");
const uuid_validation_pipe_1 = require("../../support/pipes/uuid-validation.pipe");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const helper_1 = require("../../../shared/helper");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("./guard/roles.guard");
const roles_enum_1 = require("../../../entities/roles-enum");
const setup_user_dto_1 = require("./dto/setup-user.dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const create_otp_dto_1 = require("../../../../dist/modules/main/users/dto/create-otp.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async registerUser(createUserDto) {
        let role = 'User';
        return await this.usersService.registerUser(createUserDto, role);
    }
    async registerAdmin(createAdminDto) {
        let role = 'Admin';
        return await this.usersService.registerAdmin(createAdminDto, role);
    }
    async createAccount(id, payload) {
        return this.usersService.createAccount(id, payload);
    }
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    async getUser(id) {
        return this.usersService.getUserById(id);
    }
    async filterUsers(filter, req) {
        console.log(req);
        return this.usersService.filterUsers(filter);
    }
    async updateUser(id, payload) {
        return this.usersService.updateUser(id, payload);
    }
    async removeUser(id) {
        return this.usersService.removeUser(id);
    }
    uploadFile(files) {
        return "File upload successfully";
    }
    async confirmEmail(body) {
        const email = await this.usersService.decodeConfirmationToken(body.otp);
        return await this.usersService.sendOtp(email, body);
    }
};
__decorate([
    (0, common_1.Post)('register-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('register-admin'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Put)('accountSetup/:id'),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, setup_user_dto_1.SetupUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto_1.FilterUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "filterUsers", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Post)("file-upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: "filePassportPhoto", maxCount: 1
        },
        {
            name: "fileKtpPhoto", maxCount: 1
        }
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: helper_1.Helper.filePath,
            filename: helper_1.Helper.customFileName
        }),
        limits: {
            fileSize: 5000000
        }
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], UsersController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('confirm-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_otp_dto_1.default]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "confirmEmail", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('/api/users'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map