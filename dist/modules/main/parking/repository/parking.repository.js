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
exports.ParkingRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const parking_entity_1 = require("../../../../entities/parking.entity");
const create_parking_dto_1 = require("../dto/create-parking.dto");
let ParkingRepository = class ParkingRepository extends typeorm_1.Repository {
    async createParking(createParkingDto, req) {
        const { metode, nopol, jenis_kendaraan, waktu_masuk, pengendara } = createParkingDto;
        const data = this.create();
        data.petugas = req;
        data.metode = metode;
        data.nopol = nopol;
        data.jenis_kendaraan = jenis_kendaraan;
        data.waktu_masuk = waktu_masuk;
        data.pengendara = pengendara;
        try {
            return await data.save();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
};
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_dto_1.CreateParkingDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingRepository.prototype, "createParking", null);
ParkingRepository = __decorate([
    (0, typeorm_1.EntityRepository)(parking_entity_1.Parking)
], ParkingRepository);
exports.ParkingRepository = ParkingRepository;
//# sourceMappingURL=parking.repository.js.map