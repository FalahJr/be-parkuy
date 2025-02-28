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
exports.DataPetugasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_enum_1 = require("../../../entities/roles-enum");
const uuid_validation_pipe_1 = require("../../support/pipes/uuid-validation.pipe");
const jwt_guard_1 = require("../../../utils/jwt.guard");
const filter_petugas_dto_1 = require("../users/dto/filter-petugas.dto");
const roles_guard_1 = require("../users/guard/roles.guard");
const data_petugas_service_1 = require("./data-petugas.service");
const update_location_petugas_dto_1 = require("./dto/update-location-petugas.dto");
const update_petugas_dto_1 = require("./dto/update-petugas.dto");
const update_status_petugas_dto_1 = require("./dto/update-status-petugas.dto");
let DataPetugasController = class DataPetugasController {
    constructor(dataPetugasService) {
        this.dataPetugasService = dataPetugasService;
    }
    async scan(req) {
        return this.dataPetugasService.scan(req.user.petugas);
    }
    async filterPetugas(filter) {
        return this.dataPetugasService.filterPetugas(filter);
    }
    async removePetugas(id_petugas) {
        return this.dataPetugasService.removePetugas(id_petugas);
    }
    async getBerkasPetugas() {
        const file = this.dataPetugasService.getBerkasPetugas();
        return file;
    }
    async getBerkasPetugasId(id_petugas) {
        return this.dataPetugasService.getBerkasPetugasById(id_petugas);
    }
    async berkasPetugasByName(fullName) {
        const filter = await this.dataPetugasService.getBerkasPetugasByName(fullName);
        return filter;
    }
    async getPetugasByName(fullName) {
        const filter = await this.dataPetugasService.getPetugasByName(fullName);
        return filter;
    }
    async updatePetugas(id_petugas, updatePetugasDto) {
        return this.dataPetugasService.updatePetugas(id_petugas, updatePetugasDto);
    }
    async updateLocationPetugas(id_petugas, updateLocationPetugasDto) {
        return this.dataPetugasService.updateLocationPetugas(id_petugas, updateLocationPetugasDto);
    }
    async updateStatusPetugas(id_petugas, updateStatusPetugasDto) {
        return this.dataPetugasService.updateStatusPetugas(id_petugas, updateStatusPetugasDto);
    }
    async filterParkingPetugas(id_petugas) {
        const filter = await this.dataPetugasService.listVehiclesById(id_petugas);
        return {
            filter
        };
    }
    async filterListVehicles(id_petugas) {
        const filter = await this.dataPetugasService.listVehiclesByMethod(id_petugas);
        return {
            filter
        };
    }
    async listVehiclesByNopol(id_petugas, nopol) {
        const filter = await this.dataPetugasService.listVehiclesByNopol(id_petugas, nopol);
        return {
            filter
        };
    }
    async filterParkingHistory(id_petugas) {
        return this.dataPetugasService.filteredParkingHistory(id_petugas);
    }
    async parkingHistoryNopol(id_petugas, nopol) {
        return this.dataPetugasService.parkingHistoryNopol(id_petugas, nopol);
    }
    async officerAcceptedLocation(id_petugas) {
        return this.dataPetugasService.officerAcceptedLocationById(id_petugas);
    }
    async getPetugasDiterima() {
        const getPetugasDiterima = this.dataPetugasService.getPetugasDiterima();
        return getPetugasDiterima;
    }
    async getPetugasBelumDiterima() {
        const getPetugasBelumDiterima = this.dataPetugasService.getPetugasBelumDiterima();
        return getPetugasBelumDiterima;
    }
    async filteredPetugasLocation(search) {
        return this.dataPetugasService.filteredPetugasLocation(search);
    }
    async filteredParkingOutNopol(id_petugas, nopol) {
        const filter = await this.dataPetugasService.filteredParkingOutNopol(id_petugas, nopol);
        return {
            filter
        };
    }
    async filteredKendaraan(search) {
        const filter = await this.dataPetugasService.filteredKendaraan(search);
        return {
            filter: filter,
        };
    }
    async listParkingByLocationName(locationName) {
        const filter = await this.dataPetugasService.listParkingByLocationName(locationName);
        return {
            filter
        };
    }
    async listParkingByLocationCityName(cityName) {
        const filter = await this.dataPetugasService.listParkingByLocationCityName(cityName);
        return {
            filter
        };
    }
};
__decorate([
    (0, common_1.Get)('scan-petugas'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "scan", null);
__decorate([
    (0, common_1.Get)('search-petugas'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_petugas_dto_1.FilterPetugasDto]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "filterPetugas", null);
__decorate([
    (0, common_1.Delete)('delete-petugas/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "removePetugas", null);
__decorate([
    (0, common_1.Get)('berkas-petugas'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "getBerkasPetugas", null);
__decorate([
    (0, common_1.Get)('berkas-petugas/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "getBerkasPetugasId", null);
__decorate([
    (0, common_1.Post)('berkas-petugas-name'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('fullName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "berkasPetugasByName", null);
__decorate([
    (0, common_1.Post)('get-petugas-name'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('fullName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "getPetugasByName", null);
__decorate([
    (0, common_1.Put)('update-petugas/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_petugas_dto_1.UpdatePetugasDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_petugas_dto_1.UpdatePetugasDto]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "updatePetugas", null);
__decorate([
    (0, common_1.Put)('update-location-petugas/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_location_petugas_dto_1.UpdateLocationPetugasDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_petugas_dto_1.UpdateLocationPetugasDto]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "updateLocationPetugas", null);
__decorate([
    (0, common_1.Put)('update-status-petugas/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_status_petugas_dto_1.UpdateStatusPetugasDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_petugas_dto_1.UpdateStatusPetugasDto]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "updateStatusPetugas", null);
__decorate([
    (0, common_1.Get)('detail-parkir-petugas/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "filterParkingPetugas", null);
__decorate([
    (0, common_1.Get)('list-vehicles-method/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "filterListVehicles", null);
__decorate([
    (0, common_1.Post)('list-vehicles-nopol'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('id_petugas')),
    __param(1, (0, common_1.Body)('nopol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "listVehiclesByNopol", null);
__decorate([
    (0, common_1.Get)('parking-history/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "filterParkingHistory", null);
__decorate([
    (0, common_1.Post)('parking-history-nopol'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('id_petugas')),
    __param(1, (0, common_1.Body)('nopol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "parkingHistoryNopol", null);
__decorate([
    (0, common_1.Get)('accepted-by-location/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "officerAcceptedLocation", null);
__decorate([
    (0, common_1.Get)('petugas-diterima'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "getPetugasDiterima", null);
__decorate([
    (0, common_1.Get)('petugas-belum-diterima'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "getPetugasBelumDiterima", null);
__decorate([
    (0, common_1.Get)('filter-location-city-name'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "filteredPetugasLocation", null);
__decorate([
    (0, common_1.Post)('filter-parking-out-nopol'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('id_petugas')),
    __param(1, (0, common_1.Body)('nopol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "filteredParkingOutNopol", null);
__decorate([
    (0, common_1.Post)('filter-kendaraan'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "filteredKendaraan", null);
__decorate([
    (0, common_1.Post)('list-location-name'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('locationName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "listParkingByLocationName", null);
__decorate([
    (0, common_1.Post)('list-location-city'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('cityName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataPetugasController.prototype, "listParkingByLocationCityName", null);
DataPetugasController = __decorate([
    (0, swagger_1.ApiTags)('Petugas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/api/petugas'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [data_petugas_service_1.DataPetugasService])
], DataPetugasController);
exports.DataPetugasController = DataPetugasController;
//# sourceMappingURL=data-petugas.controller.js.map