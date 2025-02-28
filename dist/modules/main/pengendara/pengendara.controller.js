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
exports.PengendaraController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_enum_1 = require("../../../entities/roles-enum");
const uuid_validation_pipe_1 = require("../../support/pipes/uuid-validation.pipe");
const jwt_guard_1 = require("../../../utils/jwt.guard");
const roles_guard_1 = require("../users/guard/roles.guard");
const update_pengendara_dto_1 = require("./dto/update-pengendara.dto");
const pengendara_service_1 = require("./pengendara.service");
const update_status_parkir_pengendara_dto_1 = require("./dto/update-status-parkir-pengendara.dto");
const update_status_pengendara_dto_1 = require("./dto/update-status-pengendara.dto");
let PengendaraController = class PengendaraController {
    constructor(pengendaraService) {
        this.pengendaraService = pengendaraService;
    }
    async getPengendara() {
        return this.pengendaraService.getAllPengendara();
    }
    async getPengendaraById(id_pengendara) {
        return this.pengendaraService.getPengendaraById(id_pengendara);
    }
    async getPengendaraByLocation(id_pengendara) {
        return this.pengendaraService.getPengendaraByLocation(id_pengendara);
    }
    async updatePengendara(id_pengendara, updatePengendaraDto) {
        return this.pengendaraService.updatePengendara(id_pengendara, updatePengendaraDto);
    }
    async updateStatusPetugas(id_pengendara, updateStatusPengendaraDto) {
        return this.pengendaraService.updateStatusPengendara(id_pengendara, updateStatusPengendaraDto);
    }
    async statusParkir(id_pengendara, updateStatusParkirPengendaraDto) {
        return this.pengendaraService.statusParkirPengendara(id_pengendara, updateStatusParkirPengendaraDto);
    }
};
__decorate([
    (0, common_1.Get)('get-pengendara'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PengendaraController.prototype, "getPengendara", null);
__decorate([
    (0, common_1.Get)('detail-pengendara/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PengendaraController.prototype, "getPengendaraById", null);
__decorate([
    (0, common_1.Get)('detail-parking-pengendara/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PengendaraController.prototype, "getPengendaraByLocation", null);
__decorate([
    (0, common_1.Put)('update-pengendara/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: update_pengendara_dto_1.UpdatePengendaraDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pengendara_dto_1.UpdatePengendaraDto]),
    __metadata("design:returntype", Promise)
], PengendaraController.prototype, "updatePengendara", null);
__decorate([
    (0, common_1.Put)('update-status-pengendara/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_status_pengendara_dto_1.UpdateStatusPengendaraDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_pengendara_dto_1.UpdateStatusPengendaraDto]),
    __metadata("design:returntype", Promise)
], PengendaraController.prototype, "updateStatusPetugas", null);
__decorate([
    (0, common_1.Put)('status-parkir-pengendara/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_status_parkir_pengendara_dto_1.UpdateStatusParkirPengendaraDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_parkir_pengendara_dto_1.UpdateStatusParkirPengendaraDto]),
    __metadata("design:returntype", Promise)
], PengendaraController.prototype, "statusParkir", null);
PengendaraController = __decorate([
    (0, swagger_1.ApiTags)('Pengendara'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/api/pengendara'),
    __metadata("design:paramtypes", [pengendara_service_1.PengendaraService])
], PengendaraController);
exports.PengendaraController = PengendaraController;
//# sourceMappingURL=pengendara.controller.js.map