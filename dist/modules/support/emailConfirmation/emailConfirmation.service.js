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
exports.EmailConfirmationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../main/users/users.service");
const email_service_1 = require("../email/email.service");
let EmailConfirmationService = class EmailConfirmationService {
    constructor(jwtService, emailService, usersService) {
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.usersService = usersService;
    }
    sendVerificationLink(email) {
        const payload = {
            email: email
        };
        const token = this.jwtService.sign(payload);
        const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
        const text = `Welcome to the Parkuy. To confirm the email address, click here: ${url}`;
        return this.emailService.sendMail({
            to: email,
            subject: 'Email confirmation',
            text,
        });
    }
    async resendConfirmationLink(id) {
        const user = await this.usersService.getUserById(id);
        if (user.emailVerified) {
            throw new common_1.BadRequestException('Email already confirmed');
        }
        await this.sendVerificationLink(user.email);
    }
    async confirmEmail(email) {
        const user = await this.usersService.getByEmail(email);
        if (user.emailVerified) {
            throw new common_1.BadRequestException('Email already confirmed');
        }
        else {
            const confirm = await this.usersService.EmailHasBeenConfirmed(email);
            return {
                status: 201,
                message: 'Email confirmation successfully'
            };
        }
    }
    async decodeConfirmationToken(token) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: 'SECRET',
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
};
EmailConfirmationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => jwt_1.JwtService))),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => email_service_1.default))),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        email_service_1.default,
        users_service_1.UsersService])
], EmailConfirmationService);
exports.EmailConfirmationService = EmailConfirmationService;
//# sourceMappingURL=emailConfirmation.service.js.map