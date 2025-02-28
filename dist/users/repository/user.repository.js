"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async register(createUserDto) {
        const { fullName, email, password, phone, cityName, verified } = createUserDto;
        const user = this.create();
        user.fullName = fullName;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.phone = phone;
        user.cityName = cityName;
        user.verified = verified;
        try {
            await user.save();
        }
        catch (e) {
            if (e.code == 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException(`Email ${email} telah digunakan`);
            }
            else {
                throw new common_1.InternalServerErrorException(e);
            }
        }
    }
    async validateUser(email, password) {
        const user = await this.findOne({ email });
        if (user && (await user.validatePassword(password))) {
            return user;
        }
        return null;
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map