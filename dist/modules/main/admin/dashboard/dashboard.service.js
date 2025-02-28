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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../../users/repository/user.repository");
const location_repository_1 = require("../../location/repository/location.repository");
const data_petugas_repository_1 = require("../../petugas/repository/data-petugas.repository");
const pengendara_repository_1 = require("../../pengendara/repository/pengendara.repository");
const parking_repository_1 = require("../../parking/repository/parking.repository");
let DashboardService = class DashboardService {
    constructor(userRespository, locationRespository, dataPetugasRepository, pengendaraRepository, parkingRepository) {
        this.userRespository = userRespository;
        this.locationRespository = locationRespository;
        this.dataPetugasRepository = dataPetugasRepository;
        this.pengendaraRepository = pengendaraRepository;
        this.parkingRepository = parkingRepository;
    }
    async getDashboards() {
        const getTotalUsers = await this.userRespository.query('SELECT COUNT(*) as totalUser FROM user');
        const getTotalLocation = await this.locationRespository.query('SELECT COUNT(*) as totalLocation FROM location');
        const getTotalDataPetugas = await this.dataPetugasRepository.query('SELECT COUNT(*) as totalPetugas FROM petugas');
        const getTotalDataPengendara = await this.pengendaraRepository.query('SELECT COUNT(*) as totalPengendara FROM pengendara');
        const objResult = {
            message: 'get all total data successfully',
            total: {
                user: parseInt(getTotalUsers[0].totalUser),
                location: parseInt(getTotalLocation[0].totalLocation),
                petugas: parseInt(getTotalDataPetugas[0].totalPetugas),
                pengendara: parseInt(getTotalDataPengendara[0].totalPengendara),
            },
        };
        return objResult;
    }
    async getPetugasDashboards(search) {
        let filteredResult;
        if (search) {
            filteredResult = await this.dataPetugasRepository.query('SELECT petugas.id_petugas, petugas.fullName, petugas.cityName AS namaKota, petugas.address AS alamatPetugas, petugas.phone, petugas.date,	location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate, location.rate, user.email FROM petugas INNER JOIN location ON petugas.locationIdLocation = location.id_location INNER JOIN user ON petugas.userId = user.id WHERE SOUNDEX(SUBSTRING(petugas.id_petugas, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))', [search.length, search, search.length]);
        }
        return filteredResult;
    }
    async getTotalTransaction(search, status_bayar) {
        let filteredResult;
        if (search && status_bayar) {
            filteredResult = await this.dataPetugasRepository.query('SELECT petugas.id_petugas,	parking.id_parking, COUNT(parking.status_bayar) as totalTransaction FROM petugas INNER JOIN parking ON parking.petugasIdPetugas WHERE SOUNDEX(SUBSTRING(petugas.id_petugas, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?)) AND parking.status_bayar = ?', [search.length, search, search.length, status_bayar]), parseInt(filteredResult[0].totalTransaction);
        }
        return filteredResult;
    }
};
DashboardService = __decorate([
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
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map