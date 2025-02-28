"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const parking_repository_1 = require("./repository/parking.repository");
const parking_service_1 = require("./parking.service");
const parking_controller_1 = require("./parking.controller");
const location_module_1 = require("../location/location.module");
let ParkingModule = class ParkingModule {
};
ParkingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([parking_repository_1.ParkingRepository]),
            location_module_1.LocationModule
        ],
        providers: [parking_service_1.ParkingService],
        controllers: [parking_controller_1.ParkingController],
    })
], ParkingModule);
exports.ParkingModule = ParkingModule;
//# sourceMappingURL=parking.module.js.map