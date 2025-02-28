"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationModule = void 0;
const common_1 = require("@nestjs/common");
const emailConfirmation_service_1 = require("./emailConfirmation.service");
const config_1 = require("@nestjs/config");
const email_module_1 = require("../email/email.module");
const jwt_1 = require("@nestjs/jwt");
const emailConfirmation_controller_1 = require("./emailConfirmation.controller");
const users_module_1 = require("../../main/users/users.module");
const jwt_config_1 = require("../../../config/jwt.config");
const users_service_1 = require("../../main/users/users.service");
const email_service_1 = require("../email/email.service");
let EmailConfirmationModule = class EmailConfirmationModule {
};
EmailConfirmationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => config_1.ConfigModule),
            (0, common_1.forwardRef)(() => email_module_1.EmailModule),
            jwt_1.JwtModule.register(jwt_config_1.jwtConfig),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule)
        ],
        providers: [emailConfirmation_service_1.EmailConfirmationService, users_service_1.UsersService, email_service_1.default],
        exports: [emailConfirmation_service_1.EmailConfirmationService],
        controllers: [emailConfirmation_controller_1.EmailConfirmationController]
    })
], EmailConfirmationModule);
exports.EmailConfirmationModule = EmailConfirmationModule;
//# sourceMappingURL=emailConfirmation.module.js.map