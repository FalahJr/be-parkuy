"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PengendaraModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pengendara_controller_1 = require("./pengendara.controller");
const pengendara_service_1 = require("./pengendara.service");
const pengendara_repository_1 = require("./repository/pengendara.repository");
let PengendaraModule = class PengendaraModule {
};
PengendaraModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([pengendara_repository_1.PengendaraRepository]),
        ],
        providers: [pengendara_service_1.PengendaraService],
        controllers: [pengendara_controller_1.PengendaraController],
        exports: [pengendara_service_1.PengendaraService],
    })
], PengendaraModule);
exports.PengendaraModule = PengendaraModule;
//# sourceMappingURL=pengendara.module.js.map