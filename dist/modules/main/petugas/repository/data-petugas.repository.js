"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPetugasRepository = void 0;
const petugas_entity_1 = require("../../../../entities/petugas.entity");
const typeorm_1 = require("typeorm");
let DataPetugasRepository = class DataPetugasRepository extends typeorm_1.Repository {
    async createPetugas(user) {
        const Petugas = this.create();
        Petugas.user = user;
        return await Petugas.save();
    }
    async filterPetugas(filter) {
        const { fullName } = filter;
        const query = this.createQueryBuilder('data');
        if (fullName) {
            query.andWhere('lower(data.fullName) LIKE :fullName', {
                fullName: `%${fullName.toLowerCase()}%`,
            });
        }
        return await query.getMany();
    }
    async getPetugasDiterima() {
        const query = this.createQueryBuilder('data');
        return await query.getMany();
    }
    async getPetugasBelumDiterima() {
        const query = this.createQueryBuilder('data');
        return await query.getMany();
    }
};
DataPetugasRepository = __decorate([
    (0, typeorm_1.EntityRepository)(petugas_entity_1.Petugas)
], DataPetugasRepository);
exports.DataPetugasRepository = DataPetugasRepository;
//# sourceMappingURL=data-petugas.repository.js.map