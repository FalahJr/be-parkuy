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
exports.DataPetugasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_petugas_repository_1 = require("./repository/data-petugas.repository");
const user_repository_1 = require("../users/repository/user.repository");
let DataPetugasService = class DataPetugasService {
    constructor(dataPetugasRepository, userRepository) {
        this.dataPetugasRepository = dataPetugasRepository;
        this.userRepository = userRepository;
    }
    async filterPetugas(filter) {
        return await this.dataPetugasRepository.filterPetugas(filter);
    }
    async getUserById(id) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} is not found`);
        }
        return user;
    }
    async getPetugasById(id_petugas) {
        const petugas = await this.dataPetugasRepository.findOne(id_petugas, { relations: ['user'] });
        if (!petugas) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
        return petugas;
    }
    async scan(req) {
        const petugas = await this.dataPetugasRepository.createQueryBuilder('petugas')
            .where('petugas.id_petugas = :id', { id: req.id_petugas })
            .innerJoinAndSelect('petugas.location', 'location');
        return petugas.getOne();
    }
    async listVehiclesById(id_petugas) {
        const petugas = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .innerJoinAndSelect("petugas.parking", "parking")
            .orderBy("parking.waktu_masuk", "DESC")
            .where("petugas.id_petugas = :id", { id: id_petugas })
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" });
        if (!petugas) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
        return petugas.getOne();
    }
    async listVehiclesByMethod(id_petugas) {
        const petugas = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .innerJoinAndSelect("petugas.parking", "parking")
            .innerJoinAndSelect("parking.pengendara", "pengendara")
            .orderBy("parking.waktu_masuk", "DESC")
            .where("petugas.id_petugas = :id", { id: id_petugas })
            .andWhere("parking.metode = :metode", { metode: "Digital" })
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" });
        if (!petugas) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
        return petugas.getOne();
    }
    async listVehiclesByNopol(id_petugas, nopol) {
        const petugas = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .innerJoinAndSelect("petugas.parking", "parking")
            .innerJoinAndSelect("parking.pengendara", "pengendara")
            .orderBy("parking.waktu_masuk", "DESC")
            .where("petugas.id_petugas = :id", { id: id_petugas })
            .andWhere("parking.nopol = :nopol", { nopol: nopol })
            .andWhere("parking.metode = :metode", { metode: "Digital" })
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" });
        if (!petugas) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
        return petugas.getOne();
    }
    async filteredParkingHistory(id_petugas) {
        const parking = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .innerJoinAndSelect("petugas.parking", "parking")
            .orderBy("parking.waktu_masuk", "DESC")
            .where("petugas.id_petugas = :id", { id: id_petugas })
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Sudah bayar" });
        if (!parking) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
        return parking.getOne();
    }
    async parkingHistoryNopol(id_petugas, nopol) {
        const parking = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .innerJoinAndSelect("petugas.parking", "parking")
            .orderBy("parking.waktu_masuk", "DESC")
            .where("petugas.id_petugas = :id", { id: id_petugas })
            .andWhere("parking.nopol = :nopol", { nopol: nopol })
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Sudah bayar" });
        if (!parking) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
        return parking.getOne();
    }
    async updatePetugas(id_petugas, updatePetugasDto) {
        const { fullName, cityName, address, phone } = updatePetugasDto;
        const data = await this.getPetugasById(id_petugas);
        data.fullName = fullName;
        data.cityName = cityName;
        data.address = address;
        data.phone = phone;
        const save = await data.save();
        if (save) {
            return {
                statuCode: 200,
                message: 'Successfully'
            };
        }
    }
    async updateLocationPetugas(id_petugas, updateLocationPetugasDto) {
        const { location } = updateLocationPetugasDto;
        const data = await this.getPetugasById(id_petugas);
        data.location = location;
        const save = await data.save();
        if (save) {
            return {
                statuCode: 200,
                message: 'Successfully'
            };
        }
    }
    async updateStatusPetugas(id_petugas, updateStatusPetugasDto) {
        const { status } = updateStatusPetugasDto;
        const data = await this.getPetugasById(id_petugas);
        data.status = status;
        const save = await data.save();
        if (save) {
            return {
                statuCode: 200,
                message: 'Successfully'
            };
        }
    }
    async getPetugasDiterima() {
        const getPetugas = await this.dataPetugasRepository.query('SELECT petugas.id_petugas, petugas.fullName, petugas.cityName, petugas.address, petugas.phone, petugas.date, petugas.status, petugas.status_bekerja, petugas.create_at, location.id_location, location.locationName,	user.id, user.email FROM petugas INNER JOIN user ON petugas.userId  = user.id LEFT JOIN location ON petugas.locationIdLocation = location.id_location WHERE petugas.status_bekerja = "Sudah diterima" ORDER BY petugas.create_at DESC');
        return getPetugas;
    }
    async getPetugasBelumDiterima() {
        const getPetugas = await this.dataPetugasRepository.query('SELECT petugas.id_petugas, petugas.fullName, petugas.cityName, petugas.address, petugas.phone, petugas.date, petugas.status, petugas.status_bekerja, petugas.create_at,	user.id, user.email FROM petugas INNER JOIN user ON petugas.userId = user.id WHERE petugas.status_bekerja = "Belum diterima" ORDER BY petugas.create_at DESC');
        return getPetugas;
    }
    async officerAcceptedLocationById(id_petugas) {
        const petugas = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .leftJoinAndSelect("petugas.location", "location")
            .innerJoinAndSelect("petugas.user", "user")
            .orderBy("petugas.create_at", "DESC")
            .where("petugas.id_petugas = :id", { id: id_petugas })
            .andWhere("petugas.status_bekerja = :status_bekerja", { status_bekerja: "Sudah diterima" });
        return petugas.getOne();
    }
    async getBerkasPetugas() {
        const petugas = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.user", "user")
            .orderBy("petugas.create_at", "DESC");
        return petugas.getMany();
    }
    async getBerkasPetugasById(id_petugas) {
        const petugas = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.user", "user")
            .where("petugas.id_petugas = :id", { id: id_petugas });
        if (!petugas) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
        return petugas.getOne();
    }
    async getBerkasPetugasByName(fullName) {
        let filteredResult;
        if (fullName) {
            filteredResult = await this.dataPetugasRepository.query('SELECT petugas.id_petugas, petugas.fullName, petugas.cityName, petugas.address, petugas.phone, petugas.date, petugas.status, petugas.status_bekerja, petugas.create_at, user.id, user.email FROM petugas INNER JOIN user ON petugas.userId  = user.id WHERE SOUNDEX(SUBSTRING(petugas.fullName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))', [fullName.length, fullName, fullName.length]);
        }
        return filteredResult;
    }
    async getPetugasByName(fullName) {
        let filteredResult;
        if (fullName) {
            filteredResult = await this.dataPetugasRepository.query('SELECT petugas.id_petugas, petugas.fullName, petugas.cityName AS namaKota, petugas.address AS alamatPetugas, petugas.phone, petugas.date,	location.id_location, location.locationName, location.cityName, location.address, location.coordinate FROM petugas INNER JOIN user ON petugas.userId  = user.id LEFT JOIN location ON petugas.locationIdLocation = location.id_location WHERE SOUNDEX(SUBSTRING(petugas.fullName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))', [fullName.length, fullName, fullName.length]);
        }
        return filteredResult;
    }
    async removePetugas(id_petugas) {
        const result = await this.dataPetugasRepository.delete(id_petugas);
        if (result.affected == 0) {
            throw new common_1.NotFoundException(`Petugas with id ${id_petugas} is not found`);
        }
    }
    async filteredPetugasLocation(search) {
        let filteredResult;
        if (search) {
            filteredResult = await this.dataPetugasRepository.query('SELECT petugas.id_petugas, petugas.fullName, petugas.cityName AS namaKota, petugas.address AS alamatPetugas, petugas.phone, petugas.date,	location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.address, location.coordinate, location.rate FROM petugas INNER JOIN location ON petugas.locationIdLocation = location.id_location WHERE SOUNDEX(SUBSTRING(location.cityName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))', [search.length, search, search.length]);
        }
        return filteredResult;
    }
    async filteredParkingOutNopol(id_petugas, nopol) {
        const parking = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .innerJoinAndSelect("petugas.parking", "parking")
            .leftJoinAndSelect("parking.pengendara", "pengendara")
            .orderBy("parking.waktu_masuk", "DESC")
            .where("parking.nopol = :nopol", { nopol: nopol })
            .andWhere("petugas.id_petugas = :id", { id: id_petugas })
            .andWhere("parking.status_bayar = :status_bayar", { status_bayar: "Belum bayar" });
        if (!parking) {
            throw new common_1.NotFoundException(`Nopol ${nopol} is not found`);
        }
        return parking.getOne();
    }
    async listParkingByLocationName(locationName) {
        const parking = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .where("location.locationName = :locationName", { locationName: locationName });
        return parking.getMany();
    }
    async listParkingByLocationCityName(cityName) {
        const parking = await this.dataPetugasRepository
            .createQueryBuilder("petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .where("location.cityName = :cityName", { cityName: cityName });
        return parking.getMany();
    }
    async filteredKendaraan(search) {
        let filteredResult;
        if (search) {
            filteredResult = await this.dataPetugasRepository.query('SELECT petugas.id_petugas, petugas.fullName, petugas.cityName AS namaKota, petugas.address AS alamatPetugas, petugas.phone, petugas.date, location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate, location.rate, parking.id_parking, parking.metode, parking.nopol, parking.jenis_kendaraan, parking.status_bayar, parking.waktu_masuk, parking.petugasIdPetugas FROM petugas INNER JOIN location ON petugas.locationIdLocation = location.id_location INNER JOIN parking ON parking.petugasIdPetugas = petugas.id_petugas WHERE SOUNDEX(SUBSTRING(parking.id_parking, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?))', [search.length, search, search.length]);
        }
        return filteredResult;
    }
};
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataPetugasService.prototype, "scan", null);
DataPetugasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_petugas_repository_1.DataPetugasRepository)),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [data_petugas_repository_1.DataPetugasRepository,
        user_repository_1.UserRepository])
], DataPetugasService);
exports.DataPetugasService = DataPetugasService;
//# sourceMappingURL=data-petugas.service.js.map