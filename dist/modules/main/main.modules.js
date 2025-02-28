"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const location_module_1 = require("./location/location.module");
const data_petugas_module_1 = require("./petugas/data-petugas.module");
const users_module_1 = require("./users/users.module");
const admin_module_1 = require("./admin/admin.module");
const parking_module_1 = require("./parking/parking.module");
const pengendara_module_1 = require("./pengendara/pengendara.module");
let MainModule = class MainModule {
};
MainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            data_petugas_module_1.DataPetugasModule,
            pengendara_module_1.PengendaraModule,
            location_module_1.LocationModule,
            parking_module_1.ParkingModule,
            admin_module_1.AdminModule
        ]
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.modules.js.map