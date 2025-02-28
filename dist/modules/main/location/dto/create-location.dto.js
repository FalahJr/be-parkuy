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
exports.FindLocationDto = exports.CreateLocationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLocationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "locationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "cityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "car", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "motorCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "availableCars", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "availableMotorCycles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "coordinate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(({ required: true })),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "rate", void 0);
exports.CreateLocationDto = CreateLocationDto;
class FindLocationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(({ required: false })),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindLocationDto.prototype, "s", void 0);
exports.FindLocationDto = FindLocationDto;
//# sourceMappingURL=create-location.dto.js.map