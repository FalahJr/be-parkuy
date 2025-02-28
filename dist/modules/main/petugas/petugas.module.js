"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetugasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const petugas_service_1 = require("./petugas.service");
const petugas_controller_1 = require("./petugas.controller");
const petugas_repository_1 = require("./repository/petugas.repository");
let PetugasModule = class PetugasModule {
};
PetugasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([petugas_repository_1.PetugasRepository]),
        ],
        providers: [petugas_service_1.PetugasService],
        controllers: [petugas_controller_1.PetugasController],
        exports: [petugas_service_1.PetugasService],
    })
], PetugasModule);
exports.PetugasModule = PetugasModule;
//# sourceMappingURL=petugas.module.js.map