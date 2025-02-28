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
exports.PengendaraService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pengendara_repository_1 = require("./repository/pengendara.repository");
let PengendaraService = class PengendaraService {
    constructor(pengendaraRepository) {
        this.pengendaraRepository = pengendaraRepository;
    }
    async getAllPengendara() {
        const pengendara = await this.pengendaraRepository
            .createQueryBuilder("pengendara")
            .orderBy("pengendara.create_at", "DESC");
        return pengendara.getMany();
    }
    async getPengendaraByLocation(id_pengendara) {
        const pengendara = await this.pengendaraRepository
            .createQueryBuilder("pengendara")
            .innerJoinAndSelect("pengendara.parking", "parking")
            .innerJoinAndSelect("parking.petugas", "petugas")
            .innerJoinAndSelect("petugas.location", "location")
            .where("pengendara.id_pengendara = :id", { id: id_pengendara });
        if (!pengendara) {
            throw new common_1.NotFoundException(`Pengendara with id ${id_pengendara} is not found`);
        }
        return pengendara.getOne();
    }
    async getPengendaraById(id_pengendara) {
        const pengendara = await this.pengendaraRepository
            .createQueryBuilder("pengendara")
            .innerJoinAndSelect("pengendara.user", "user")
            .orderBy("pengendara.create_at", "DESC")
            .where("pengendara.id_pengendara = :id", { id: id_pengendara });
        if (!pengendara) {
            throw new common_1.NotFoundException(`Pengendara with id ${id_pengendara} is not found`);
        }
        return pengendara.getOne();
    }
    async updatePengendara(id_pengendara, updatePengendaraDto) {
        const { fullName, cityName, address, phone, nopol, jenis_kendaraan } = updatePengendaraDto;
        const data = await this.getPengendaraById(id_pengendara);
        data.fullName = fullName;
        data.cityName = cityName;
        data.address = address;
        data.phone = phone;
        data.nopol = nopol;
        data.jenis_kendaraan = jenis_kendaraan;
        const save = await data.save();
        if (save) {
            return {
                statuCode: 200,
                message: 'Successfully'
            };
        }
    }
    async updateStatusPengendara(id_pengendara, updateStatusPengendaraDto) {
        const { status } = updateStatusPengendaraDto;
        const data = await this.getPengendaraById(id_pengendara);
        data.status = status;
        const save = await data.save();
        if (save) {
            return {
                statuCode: 200,
                message: 'Successfully update'
            };
        }
    }
    async statusParkirPengendara(id_pengendara, updateStatusParkirPengendaraDto) {
        const { status_parkir } = updateStatusParkirPengendaraDto;
        const data = await this.getPengendaraById(id_pengendara);
        data.status_parkir = status_parkir;
        const save = await data.save();
        if (save) {
            return {
                statuCode: 200,
                message: 'Successfully update'
            };
        }
    }
};
PengendaraService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pengendara_repository_1.PengendaraRepository)),
    __metadata("design:paramtypes", [pengendara_repository_1.PengendaraRepository])
], PengendaraService);
exports.PengendaraService = PengendaraService;
//# sourceMappingURL=pengendara.service.js.map