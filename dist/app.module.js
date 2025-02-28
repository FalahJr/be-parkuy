"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const main_modules_1 = require("./modules/main/main.modules");
const support_modules_1 = require("./modules/support/support.modules");
const user_entity_1 = require("./entities/user.entity");
const admin_entity_1 = require("./entities/admin.entity");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const petugas_entity_1 = require("./entities/petugas.entity");
const pengendara_entity_1 = require("./entities/pengendara.entity");
const location_entity_1 = require("./entities/location.entity");
const app_config_1 = require("./config/app.config");
const exist_validator_1 = require("./etc/validator/exist-validator");
const parking_entity_1 = require("./entities/parking.entity");
const dbConfigMysql = (0, app_config_1.default)().db.mysql;
const dbConfigRedis = (0, app_config_1.default)().db.redis;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [app_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: dbConfigMysql.host,
                port: dbConfigMysql.port,
                username: dbConfigMysql.user,
                password: dbConfigMysql.password,
                database: dbConfigMysql.database,
                entities: [
                    user_entity_1.User,
                    location_entity_1.Location,
                    parking_entity_1.Parking,
                    petugas_entity_1.Petugas,
                    pengendara_entity_1.Pengendara,
                    admin_entity_1.Admin,
                    refresh_token_entity_1.RefreshToken
                ],
                synchronize: true,
            }),
            main_modules_1.MainModule,
            support_modules_1.SupportModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, exist_validator_1.ExistValidator],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map