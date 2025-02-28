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
exports.Petugas = void 0;
const typeorm_1 = require("typeorm");
const location_entity_1 = require("./location.entity");
const parking_entity_1 = require("./parking.entity");
const user_entity_1 = require("./user.entity");
let Petugas = class Petugas extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Petugas.prototype, "id_petugas", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Petugas.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Petugas.prototype, "cityName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Petugas.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Petugas.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Petugas.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Offline" }),
    __metadata("design:type", String)
], Petugas.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Belum diterima" }),
    __metadata("design:type", String)
], Petugas.prototype, "status_bekerja", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => location_entity_1.Location, location => location.id_location),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", location_entity_1.Location)
], Petugas.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Petugas.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parking_entity_1.Parking, parking => parking.petugas, { cascade: true }),
    __metadata("design:type", parking_entity_1.Parking)
], Petugas.prototype, "parking", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Petugas.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ onUpdate: "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], Petugas.prototype, "update_at", void 0);
Petugas = __decorate([
    (0, typeorm_1.Entity)()
], Petugas);
exports.Petugas = Petugas;
//# sourceMappingURL=petugas.entity.js.map