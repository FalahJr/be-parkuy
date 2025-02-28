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
exports.ParkingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_parking_dto_1 = require("./dto/create-parking.dto");
const parking_repository_1 = require("./repository/parking.repository");
let ParkingService = class ParkingService {
    constructor(parkingRepository) {
        this.parkingRepository = parkingRepository;
    }
    async createParking(createParkingDto, req) {
        const parking = await this.parkingRepository.createParking(createParkingDto, req);
        if (parking) {
            return {
                status: 201,
                message: 'Succesfully created parking data',
                data: {
                    metode: parking.metode,
                    nopol: parking.nopol,
                    jenis_kendaraan: parking.jenis_kendaraan,
                    waktu_masuk: parking.waktu_masuk,
                    petugas: parking.petugas.fullName,
                    id_petugas: parking.petugas.id_petugas
                }
            };
        }
    }
    async updateParking(id_parking, updateParkingDto) {
        const { nopol, jenis_kendaraan } = updateParkingDto;
        const data = await this.getParkingById(id_parking);
        data.nopol = nopol;
        data.jenis_kendaraan = jenis_kendaraan;
        const save = await data.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Successfully'
            };
        }
    }
    async payForParking(id_parking, payForParkingDto) {
        const { status_bayar, waktu_keluar } = payForParkingDto;
        const data = await this.getParkingById(id_parking);
        data.status_bayar = status_bayar;
        data.waktu_keluar = waktu_keluar;
        const save = await data.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Successfully'
            };
        }
    }
    async getParkingById(id_parking) {
        const data = await this.parkingRepository.findOne(id_parking);
        if (!data) {
            throw new common_1.NotFoundException(`Parking with id ${id_parking} is not found`);
        }
        return data;
    }
    async getParkingEntrance() {
        const parking = await this.parkingRepository
            .createQueryBuilder("parking")
            .innerJoinAndSelect("parking.petugas", "petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .orderBy("parking.create_at", "DESC")
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" });
        return parking.getMany();
    }
    async getParkingEntranceById(id_parking) {
        const parking = await this.parkingRepository
            .createQueryBuilder("parking")
            .innerJoinAndSelect("parking.petugas", "petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .leftJoinAndSelect("parking.pengendara", "pengendara")
            .leftJoinAndSelect("pengendara.user", "user")
            .where("parking.id_parking = :id", { id: id_parking })
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" });
        if (!parking) {
            throw new common_1.NotFoundException(`Petugas with id ${id_parking} is not found`);
        }
        return parking.getOne();
    }
    async getParkingOut() {
        const parking = await this.parkingRepository
            .createQueryBuilder("parking")
            .innerJoinAndSelect("parking.petugas", "petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .orderBy("parking.create_at", "DESC")
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Sudah bayar" });
        return parking.getMany();
    }
    async getParkingOutById(id_parking) {
        const parking = await this.parkingRepository
            .createQueryBuilder("parking")
            .innerJoinAndSelect("parking.petugas", "petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .leftJoinAndSelect("parking.pengendara", "pengendara")
            .leftJoinAndSelect("pengendara.user", "user")
            .where("parking.id_parking = :id", { id: id_parking })
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Sudah bayar" });
        if (!parking) {
            throw new common_1.NotFoundException(`Petugas with id ${id_parking} is not found`);
        }
        return parking.getOne();
    }
};
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parking_dto_1.CreateParkingDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingService.prototype, "createParking", null);
ParkingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(parking_repository_1.ParkingRepository)),
    __metadata("design:paramtypes", [parking_repository_1.ParkingRepository])
], ParkingService);
exports.ParkingService = ParkingService;
//# sourceMappingURL=parking.service.js.map