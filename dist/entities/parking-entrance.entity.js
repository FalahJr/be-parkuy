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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parking = void 0;
const typeorm_1 = require("typeorm");
const petugas_entity_1 = require("./petugas.entity");
let Parking = class Parking extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Parking.prototype, "id_parking", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Parking.prototype, "metode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Parking.prototype, "nopol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Parking.prototype, "jenis_kendaraan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => petugas_entity_1.Petugas, petugas => petugas.id_petugas),
    __metadata("design:type", petugas_entity_1.Petugas)
], Parking.prototype, "petugas", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "belum bayar" }),
    __metadata("design:type", String)
], Parking.prototype, "status_bayar", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Parking.prototype, "waktu_masuk", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ onUpdate: "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], Parking.prototype, "update_at", void 0);
Parking = __decorate([
    (0, typeorm_1.Entity)()
], Parking);
exports.Parking = Parking;
//# sourceMappingURL=parking-entrance.entity.js.map