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
const user_entity_1 = require("../../../../entities/user.entity");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async getByEmail(email) {
        return this.findOne({ where: { email } });
    }
    async getAllUser() {
        const query = this.createQueryBuilder('user');
        return await query.getMany();
    }
    async filterUsers(filter) {
        const { role } = filter;
        const query = this.createQueryBuilder('user');
        if (role) {
            query.andWhere('lower(user.role) LIKE :role', {
                role: `%${role.toLowerCase()}%`,
            });
        }
        return await query.getMany();
    }
    async createPengendara(createPengendaraDto, role) {
        const { email, password, } = createPengendaraDto;
        const user = this.create();
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.role = role;
        try {
            return await user.save();
        }
        catch (e) {
            if (e.code == 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException([
                    `Email ${email} already used`
                ]);
            }
            else {
                throw new common_1.InternalServerErrorException(e);
            }
        }
    }
    async createPetugas(createPetugasDto, role) {
        const { email, password, } = createPetugasDto;
        const user = this.create();
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.role = role;
        try {
            return await user.save();
        }
        catch (e) {
            if (e.code == 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException([
                    `Email ${email} already used`
                ]);
            }
            else {
                throw new common_1.InternalServerErrorException(e);
            }
        }
    }
    async createAdmin(createAdminDto, role) {
        const { username, password, } = createAdminDto;
        const user = this.create();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.role = role;
        try {
            return await user.save();
        }
        catch (e) {
            if (e.code == 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException([
                    `Username ${username} already used`
                ]);
            }
            else {
                throw new common_1.InternalServerErrorException(e);
            }
        }
    }
    async validateUser(email, password) {
        const user_email = await this.findOne({ email });
        if (user_email && (await user_email.validatePassword(password))) {
            return user_email;
        }
        return null;
    }
    async validateAdmin(username, password) {
        const admin_username = await this.findOne({ username });
        if (admin_username && (await admin_username.validatePassword(password))) {
            return admin_username;
        }
        return null;
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map