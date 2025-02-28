"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./repository/user.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../../support/email/email.service");
const jwt_config_1 = require("../../../config/jwt.config");
const admin_repository_1 = require("./repository/admin.repository");
const pengendara_repository_1 = require("../pengendara/repository/pengendara.repository");
const data_petugas_repository_1 = require("../petugas/repository/data-petugas.repository");
const data_petugas_service_1 = require("../petugas/data-petugas.service");
let UsersService = class UsersService {
    constructor(userRespository, adminRespository, dataPetugasRespository, pengendaraRespository, jwtService, emailService, dataPetugasService) {
        this.userRespository = userRespository;
        this.adminRespository = adminRespository;
        this.dataPetugasRespository = dataPetugasRespository;
        this.pengendaraRespository = pengendaraRespository;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.dataPetugasService = dataPetugasService;
    }
    async registerPengendara(createPengendaraDto, role) {
        const user = await this.userRespository.createPengendara(createPengendaraDto, role);
        const sendLink = await this.sendVerificationLink(user.email, user.id);
        if (user) {
            const pengendara = await this.pengendaraRespository.createPengendara(user);
            return {
                statusCode: 201,
                message: 'Successfully register',
                data: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    emailVerified: user.emailVerified,
                }
            };
        }
    }
    async registerPetugas(createPetugasDto, role) {
        const user = await this.userRespository.createPetugas(createPetugasDto, role);
        const sendLink = await this.sendVerificationLink(user.email, user.id);
        if (user) {
            const petugas = await this.dataPetugasRespository.createPetugas(user);
            return {
                statusCode: 201,
                message: 'Successfully register',
                data: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    emailVerified: user.emailVerified,
                }
            };
        }
    }
    async registerAdmin(createAdminDto, role) {
        const user = await this.userRespository.createAdmin(createAdminDto, role);
        if (user) {
            const admin = await this.adminRespository.createAdmin(user);
            return {
                statusCode: 201,
                message: 'Successfully register',
                data: {
                    id_admin: user.id,
                    username: user.username,
                    role: user.role,
                }
            };
        }
    }
    async createAccountPengendara(id_pengendara, setupPengendaraDto) {
        const { fullName, phone, cityName, address, nopol, jenis_kendaraan } = setupPengendaraDto;
        const user = await this.getPengendaraById(id_pengendara);
        user.fullName = fullName;
        user.phone = phone;
        user.cityName = cityName;
        user.address = address;
        user.nopol = nopol;
        user.jenis_kendaraan = jenis_kendaraan;
        const save = await user.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Successfully Account Setup Pengendara'
            };
        }
    }
    async createAccountPetugas(id_petugas, setupPetugasDto) {
        const { fullName, cityName, address, phone, } = setupPetugasDto;
        const user = await this.dataPetugasService.getPetugasById(id_petugas);
        user.fullName = fullName;
        user.cityName = cityName;
        user.address = address;
        user.phone = phone;
        const save = await user.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Successfully Account Setup Petugas'
            };
        }
    }
    async setupBerkasPetugas(id_petugas, setupBerkasPetugasDto) {
        const { date } = setupBerkasPetugasDto;
        const user = await this.dataPetugasService.getPetugasById(id_petugas);
        user.date = date;
        const save = await user.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Succesfully'
            };
        }
    }
    async updateBerkasPetugas(id_petugas, updateBerkasPetugasDto) {
        const { fullName, cityName, address, phone } = updateBerkasPetugasDto;
        const user = await this.dataPetugasService.getPetugasById(id_petugas);
        user.fullName = fullName;
        user.cityName = cityName;
        user.address = address;
        user.phone = phone;
        const save = await user.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Succesfully'
            };
        }
    }
    async acceptPetugas(id_petugas) {
        const data = await this.dataPetugasService.getPetugasById(id_petugas);
        data.status_bekerja = "Sudah diterima";
        await data.save();
        return {
            message: `Successfully accept petugas`
        };
    }
    async refuseOfficer(id_petugas) {
        const data = await this.dataPetugasService.getPetugasById(id_petugas);
        data.status_bekerja = "Ditolak",
            data.user.emailVerified = false;
        await data.user.save();
        await data.save();
        return {
            message: `successfully refuse officer`
        };
    }
    async checkVerifiedEmail(email) {
        const verified = await this.userRespository.findOne({ where: { email } });
        if (verified.emailVerified) {
            return true;
        }
        else {
            return false;
        }
    }
    async EmailHasBeenConfirmed(email) {
        return this.userRespository.update({ email }, {
            emailVerified: true
        });
    }
    async getByEmail(email) {
        return this.userRespository.findOne({ where: { email } });
    }
    async getAllUsers() {
        return this.userRespository.getAllUser();
    }
    async getUserById(id) {
        const user = await this.userRespository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} is not found`);
        }
        return user;
    }
    async getPengendaraById(id) {
        const pengendara = await this.pengendaraRespository.findOne(id);
        if (!pengendara) {
            throw new common_1.NotFoundException(`Pengendara with id ${id} is not found`);
        }
        return pengendara;
    }
    async filterUsers(filter) {
        return await this.userRespository.filterUsers(filter);
    }
    async updateUser(id, updateUserDto) {
        const { username } = updateUserDto;
        const user = await this.getUserById(id);
        user.username = username;
        await user.save();
    }
    async validateUser(email, password) {
        return await this.userRespository.validateUser(email, password);
    }
    async validateAdmin(username, password) {
        return await this.userRespository.validateAdmin(username, password);
    }
    async findUserById(id) {
        return await this.userRespository.findOne(id);
    }
    async removeUser(id) {
        const result = await this.userRespository.delete(id);
        if (result.affected == 0) {
            throw new common_1.NotFoundException(`User with id ${id} is not found`);
        }
    }
    async sendVerificationLink(email, id) {
        const url = `${process.env.EMAIL_CONFIRMATION_URL}${id}`;
        const html = `<b>Welcome to the Parkuy. To confirm the email address, click here: </b> <p> ${url}</p>`;
        return this.emailService.sendMail({
            to: email,
            subject: 'Email confirmation',
            html,
        });
    }
    async sendForgetPasswordLink(email) {
        const user = await this.getByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException('Email not found');
        }
        else {
            const payload = {
                email: email
            };
            const token = this.jwtService.sign(payload);
            const url = `${process.env.RESET_PASSWORD_URL}?token=${token}`;
            const html = `<b>Welcome to the Parkuy. To reset your password, please click this url: </b> <p> ${url}</p>`;
            return this.emailService.sendMail({
                to: email,
                subject: 'Reset Password',
                html,
            });
        }
    }
    async confirmEmail(email) {
        const user = await this.getByEmail(email);
        if (user.emailVerified) {
            throw new common_1.BadRequestException('Email already confirmed');
        }
        else {
            const confirm = await this.EmailHasBeenConfirmed(email);
            return {
                statusCode: 201,
                message: 'Email confirmation successfully'
            };
        }
    }
    async decodeConfirmationToken(token) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: jwt_config_1.jwtConfig.secret,
            });
            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new common_1.BadRequestException();
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'TokenExpiredError') {
                throw new common_1.BadRequestException('Email confirmation token expired');
            }
            throw new common_1.BadRequestException('Bad confirmation token');
        }
    }
    async resetPassword(email, resetPasswordDto) {
        const { password } = resetPasswordDto;
        const user = await this.getByEmail(email);
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        const save = await user.save();
        if (save) {
            return {
                statuCode: 201,
                message: 'Successfully changed password'
            };
        }
    }
    async resetPasswordProfile(email, resetPasswordDto) {
        const { password } = resetPasswordDto;
        const user = await this.getByEmail(email);
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        const save = await user.save();
        if (save) {
            return {
                statuCode: 201,
                message: 'Successfully changed password'
            };
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(0, (0, typeorm_1.InjectRepository)(admin_repository_1.AdminRepository)),
    __param(0, (0, typeorm_1.InjectRepository)(data_petugas_repository_1.DataPetugasRepository)),
    __param(0, (0, typeorm_1.InjectRepository)(pengendara_repository_1.PengendaraRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        admin_repository_1.AdminRepository,
        data_petugas_repository_1.DataPetugasRepository,
        pengendara_repository_1.PengendaraRepository,
        jwt_1.JwtService,
        email_service_1.default,
        data_petugas_service_1.DataPetugasService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map