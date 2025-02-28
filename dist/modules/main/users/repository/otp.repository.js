"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const otp_entity_1 = require("../../../../entities/otp.entity");
let OtpRepository = class OtpRepository extends typeorm_1.Repository {
    async createOtp(createOtpDto) {
        const { otp, } = createOtpDto;
        const user = this.create();
        user.salt = await bcrypt.genSalt();
        user.otp = await bcrypt.hash(otp, user.salt);
        try {
            return await user.save();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
};
OtpRepository = __decorate([
    (0, typeorm_1.EntityRepository)(otp_entity_1.Otp)
], OtpRepository);
exports.OtpRepository = OtpRepository;
//# sourceMappingURL=otp.repository.js.map