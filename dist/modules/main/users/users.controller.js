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
const filter_user_dto_1 = require("./dto/filter-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_service_1 = require("./users.service");
const uuid_validation_pipe_1 = require("../../support/pipes/uuid-validation.pipe");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("./guard/roles.guard");
const roles_enum_1 = require("../../../entities/roles-enum");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const create_petugas_dto_1 = require("./dto/create-petugas.dto");
const setup_petugas_dto_1 = require("./dto/setup-petugas.dto");
const jwt_guard_1 = require("../../../utils/jwt.guard");
const create_pengendara_dto_1 = require("./dto/create-pengendara.dto");
const setup_pengendara_dto_1 = require("./dto/setup-pengendara.dto");
const setup_berkas_petugas_dto_1 = require("./dto/setup-berkas-petugas.dto");
const data_petugas_service_1 = require("../petugas/data-petugas.service");
const update_berkas_petugas_dto_1 = require("./dto/update-berkas-petugas.dto");
let UsersController = class UsersController {
    constructor(usersService, dataPetugasService) {
        this.usersService = usersService;
        this.dataPetugasService = dataPetugasService;
    }
    async registerPengendara(createPengendaraDto) {
        let role = 'Pengendara';
        return await this.usersService.registerPengendara(createPengendaraDto, role);
    }
    async registerAdmin(createAdminDto) {
        let role = 'Admin';
        return await this.usersService.registerAdmin(createAdminDto, role);
    }
    async registerPetugas(createPetugasDto) {
        let role = 'Petugas';
        return await this.usersService.registerPetugas(createPetugasDto, role);
    }
    async createAccountPengendara(id_pengendara, setupPengendaraDto) {
        return this.usersService.createAccountPengendara(id_pengendara, setupPengendaraDto);
    }
    async createAccountPetugas(id_petugas, setupPetugasDto) {
        return this.usersService.createAccountPetugas(id_petugas, setupPetugasDto);
    }
    async refuseOfficer(id_petugas) {
        return this.usersService.refuseOfficer(id_petugas);
    }
    async setupBerkasPetugas(id_petugas, setupBerkasPetugasDto) {
        return this.usersService.setupBerkasPetugas(id_petugas, setupBerkasPetugasDto);
    }
    async updateBerkasPetugas(id_petugas, updateBerkasPetugasDto) {
        return this.usersService.updateBerkasPetugas(id_petugas, updateBerkasPetugasDto);
    }
    async acceptPetugas(id_petugas) {
        return this.usersService.acceptPetugas(id_petugas);
    }
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    async getUser(id) {
        return this.usersService.getUserById(id);
    }
    async getPetugas(id) {
        return this.dataPetugasService.getPetugasById(id);
    }
    async filterUsers(filter) {
        return this.usersService.filterUsers(filter);
    }
    async updateUser(id, payload) {
        return this.usersService.updateUser(id, payload);
    }
    async removeUser(id) {
        return this.usersService.removeUser(id);
    }
    async confirmEmail(id) {
        const user = await this.usersService.getUserById(id);
        const userEmail = user.email;
        await this.usersService.confirmEmail(userEmail);
    }
};
__decorate([
    (0, common_1.Post)('register-pengendara'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pengendara_dto_1.CreatePengendaraDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerPengendara", null);
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
    (0, common_1.Post)('register-petugas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_petugas_dto_1.CreatePetugasDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerPetugas", null);
__decorate([
    (0, common_1.Put)('account-setup-pengendara/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: setup_pengendara_dto_1.SetupPengendaraDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, setup_pengendara_dto_1.SetupPengendaraDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createAccountPengendara", null);
__decorate([
    (0, common_1.Put)('account-setup-petugas/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: setup_petugas_dto_1.SetupPetugasDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, setup_petugas_dto_1.SetupPetugasDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createAccountPetugas", null);
__decorate([
    (0, common_1.Put)('refuse-officer/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refuseOfficer", null);
__decorate([
    (0, common_1.Put)('setup-berkas-petugas/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: setup_berkas_petugas_dto_1.SetupBerkasPetugasDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, setup_berkas_petugas_dto_1.SetupBerkasPetugasDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setupBerkasPetugas", null);
__decorate([
    (0, common_1.Put)('update-berkas-petugas/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_berkas_petugas_dto_1.UpdateBerkasPetugasDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_berkas_petugas_dto_1.UpdateBerkasPetugasDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateBerkasPetugas", null);
__decorate([
    (0, common_1.Put)('accept-petugas/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "acceptPetugas", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('petugas/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPetugas", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto_1.FilterUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "filterUsers", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Get)('confirm/:id'),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "confirmEmail", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/api/users'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        data_petugas_service_1.DataPetugasService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map