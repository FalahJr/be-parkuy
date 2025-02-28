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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../../users/repository/user.repository");
const location_repository_1 = require("../../location/repository/location.repository");
const data_petugas_repository_1 = require("../../petugas/repository/data-petugas.repository");
const pengendara_repository_1 = require("../../pengendara/repository/pengendara.repository");
const parking_repository_1 = require("../../parking/repository/parking.repository");
let MenuService = class MenuService {
    constructor(userRespository, locationRespository, dataPetugasRepository, pengendaraRepository, parkingRepository) {
        this.userRespository = userRespository;
        this.locationRespository = locationRespository;
        this.dataPetugasRepository = dataPetugasRepository;
        this.pengendaraRepository = pengendaraRepository;
        this.parkingRepository = parkingRepository;
    }
    async officerAcceptedLocationById(id_petugas) {
        const petugas = await this.dataPetugasRepository
            .createQueryBuilder('petugas')
            .innerJoinAndSelect("petugas.location", "location")
            .innerJoinAndSelect("petugas.user", "user")
            .orderBy("petugas.create_at", "DESC")
            .where("petugas.id_petugas = :id", { id: id_petugas })
            .andWhere("petugas.status_bekerja = :status_bekerja", { status_bekerja: "Sudah diterima" });
        if (!petugas) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
        return petugas.getOne();
    }
    async getBerkasPetugas() {
        const petugas = await this.dataPetugasRepository
            .createQueryBuilder('petugas')
            .innerJoinAndSelect("petugas.user", "user");
        return petugas.getMany();
    }
};
MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(0, (0, typeorm_1.InjectRepository)(location_repository_1.LocationRepository)),
    __param(0, (0, typeorm_1.InjectRepository)(data_petugas_repository_1.DataPetugasRepository)),
    __param(0, (0, typeorm_1.InjectRepository)(pengendara_repository_1.PengendaraRepository)),
    __param(0, (0, typeorm_1.InjectRepository)(parking_repository_1.ParkingRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        location_repository_1.LocationRepository,
        data_petugas_repository_1.DataPetugasRepository,
        pengendara_repository_1.PengendaraRepository,
        parking_repository_1.ParkingRepository])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map