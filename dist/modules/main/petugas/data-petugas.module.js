"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPetugasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_petugas_service_1 = require("./data-petugas.service");
const data_petugas_controller_1 = require("./data-petugas.controller");
const data_petugas_repository_1 = require("./repository/data-petugas.repository");
const user_repository_1 = require("../users/repository/user.repository");
let DataPetugasModule = class DataPetugasModule {
};
DataPetugasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([data_petugas_repository_1.DataPetugasRepository, user_repository_1.UserRepository]),
        ],
        providers: [data_petugas_service_1.DataPetugasService],
        controllers: [data_petugas_controller_1.DataPetugasController],
        exports: [data_petugas_service_1.DataPetugasService],
    })
], DataPetugasModule);
exports.DataPetugasModule = DataPetugasModule;
//# sourceMappingURL=data-petugas.module.js.map