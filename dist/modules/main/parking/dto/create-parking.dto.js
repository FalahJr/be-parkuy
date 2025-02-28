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
exports.FindParkingDto = exports.CreateParkingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pengendara_entity_1 = require("../../../../entities/pengendara.entity");
class CreateParkingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateParkingDto.prototype, "metode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateParkingDto.prototype, "nopol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateParkingDto.prototype, "jenis_kendaraan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateParkingDto.prototype, "waktu_masuk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: false })),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateParkingDto.prototype, "waktu_keluar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: false })),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", pengendara_entity_1.Pengendara)
], CreateParkingDto.prototype, "pengendara", void 0);
exports.CreateParkingDto = CreateParkingDto;
class FindParkingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(({ required: false })),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindParkingDto.prototype, "s", void 0);
exports.FindParkingDto = FindParkingDto;
//# sourceMappingURL=create-parking.dto.js.map