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
exports.ParkingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../users/guard/roles.guard");
const roles_enum_1 = require("../../../entities/roles-enum");
const jwt_guard_1 = require("../../../utils/jwt.guard");
const parking_service_1 = require("./parking.service");
const create_parking_dto_1 = require("./dto/create-parking.dto");
const uuid_validation_pipe_1 = require("../../support/pipes/uuid-validation.pipe");
const pay_for_parking_dto_1 = require("./dto/pay-for-parking.dto");
const update_parking_dto_1 = require("./dto/update-parking.dto");
let ParkingController = class ParkingController {
    constructor(parkingService) {
        this.parkingService = parkingService;
    }
    async createParking(createParkingDto, req) {
        return this.parkingService.createParking(createParkingDto, req.user.petugas);
    }
    async updateParking(id_parking, updateParkingDto) {
        return this.parkingService.updateParking(id_parking, updateParkingDto);
    }
    async bayarParkir(id_parking, payForParkingDto) {
        return this.parkingService.payForParking(id_parking, payForParkingDto);
    }
    async parkingEntrance() {
        return this.parkingService.getParkingEntrance();
    }
    async parkingEntranceById(id_parking) {
        return this.parkingService.getParkingEntranceById(id_parking);
    }
    async parkingOut() {
        return this.parkingService.getParkingOut();
    }
    async parkingOutById(id_parking) {
        return this.parkingService.getParkingOutById(id_parking);
    }
};
__decorate([
    (0, common_1.Post)('create-parking'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_dto_1.CreateParkingDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "createParking", null);
__decorate([
    (0, common_1.Put)('update-parking/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_parking_dto_1.UpdateParkingDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_parking_dto_1.UpdateParkingDto]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "updateParking", null);
__decorate([
    (0, common_1.Put)('bayar-parkir/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pay_for_parking_dto_1.PayForParkingDto]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "bayarParkir", null);
__decorate([
    (0, common_1.Get)('parking-entrance'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "parkingEntrance", null);
__decorate([
    (0, common_1.Get)('parking-entrance/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "parkingEntranceById", null);
__decorate([
    (0, common_1.Get)('parking-out'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "parkingOut", null);
__decorate([
    (0, common_1.Get)('parking-out/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParkingController.prototype, "parkingOutById", null);
ParkingController = __decorate([
    (0, swagger_1.ApiTags)('Parking'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/api/parking'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [parking_service_1.ParkingService])
], ParkingController);
exports.ParkingController = ParkingController;
//# sourceMappingURL=parking.controller.js.map