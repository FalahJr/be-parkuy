"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PengendaraRepository = void 0;
const pengendara_entity_1 = require("../../../../entities/pengendara.entity");
const typeorm_1 = require("typeorm");
let PengendaraRepository = class PengendaraRepository extends typeorm_1.Repository {
    async createPengendara(user) {
        const Pengendara = this.create();
        Pengendara.user = user;
        return await Pengendara.save();
    }
    async getPengendara() {
        const query = this.createQueryBuilder('data');
        return await query.getMany();
    }
};
PengendaraRepository = __decorate([
    (0, typeorm_1.EntityRepository)(pengendara_entity_1.Pengendara)
], PengendaraRepository);
exports.PengendaraRepository = PengendaraRepository;
//# sourceMappingURL=pengendara.repository.js.map