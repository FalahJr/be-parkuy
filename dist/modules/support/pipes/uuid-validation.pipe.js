"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let UUIDValidationPipe = class UUIDValidationPipe {
    transform(value) {
        if (!(0, class_validator_1.isUUID)(value, 4)) {
            throw new common_1.BadRequestException(`Value ${value} is not valid UUID`);
        }
        return value;
    }
};
UUIDValidationPipe = __decorate([
    (0, common_1.Injectable)()
], UUIDValidationPipe);
exports.UUIDValidationPipe = UUIDValidationPipe;
//# sourceMappingURL=uuid-validation.pipe.js.map