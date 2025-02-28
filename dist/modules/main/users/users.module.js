"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./repository/user.repository");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const config_1 = require("@nestjs/config");
const email_module_1 = require("../../support/email/email.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../../config/jwt.config");
const jwt_strategy_1 = require("../../../utils/jwt.strategy");
const admin_repository_1 = require("./repository/admin.repository");
const pengendara_repository_1 = require("../pengendara/repository/pengendara.repository");
const data_petugas_repository_1 = require("../petugas/repository/data-petugas.repository");
const data_petugas_service_1 = require("../petugas/data-petugas.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository, admin_repository_1.AdminRepository, data_petugas_repository_1.DataPetugasRepository, pengendara_repository_1.PengendaraRepository]),
            config_1.ConfigModule,
            email_module_1.EmailModule,
            jwt_1.JwtModule.register(jwt_config_1.jwtConfig),
        ],
        providers: [users_service_1.UsersService, data_petugas_service_1.DataPetugasService, jwt_strategy_1.JwtStrategy],
        controllers: [users_controller_1.UsersController],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map