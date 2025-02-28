"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const location_repository_1 = require("../../location/repository/location.repository");
const parking_repository_1 = require("../../parking/repository/parking.repository");
const pengendara_repository_1 = require("../../pengendara/repository/pengendara.repository");
const data_petugas_repository_1 = require("../../petugas/repository/data-petugas.repository");
const user_repository_1 = require("../../users/repository/user.repository");
const menu_controller_1 = require("./menu.controller");
const menu_service_1 = require("./menu.service");
let MenuModule = class MenuModule {
};
MenuModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository, location_repository_1.LocationRepository, data_petugas_repository_1.DataPetugasRepository, pengendara_repository_1.PengendaraRepository, parking_repository_1.ParkingRepository]),
        ],
        providers: [menu_service_1.MenuService],
        controllers: [menu_controller_1.MenuController],
        exports: [menu_service_1.MenuService],
    })
], MenuModule);
exports.MenuModule = MenuModule;
//# sourceMappingURL=menu.module.js.map