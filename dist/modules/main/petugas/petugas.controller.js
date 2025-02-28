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
exports.PetugasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const uuid_validation_pipe_1 = require("../../support/pipes/uuid-validation.pipe");
const filter_petugas_dto_1 = require("../users/dto/filter-petugas.dto");
const petugas_service_1 = require("./petugas.service");
let PetugasController = class PetugasController {
    constructor(petugasService) {
        this.petugasService = petugasService;
    }
    async getPetugas(id) {
        return this.petugasService.getPetugasById(id);
    }
    async filterPetugas(filter) {
        return this.petugasService.filterPetugas(filter);
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PetugasController.prototype, "getPetugas", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_petugas_dto_1.FilterPetugasDto]),
    __metadata("design:returntype", Promise)
], PetugasController.prototype, "filterPetugas", null);
PetugasController = __decorate([
    (0, swagger_1.ApiTags)('Petugas'),
    (0, common_1.Controller)('/api/petugas'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [petugas_service_1.PetugasService])
], PetugasController);
exports.PetugasController = PetugasController;
//# sourceMappingURL=petugas.controller.js.map