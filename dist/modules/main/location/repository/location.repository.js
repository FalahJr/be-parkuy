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
exports.LocationRepository = void 0;
const location_entity_1 = require("../../../../entities/location.entity");
const typeorm_1 = require("typeorm");
const create_location_dto_1 = require("../dto/create-location.dto");
const common_1 = require("@nestjs/common");
let LocationRepository = class LocationRepository extends typeorm_1.Repository {
    async createLocation(createLocationDto, req) {
        const { locationName, cityName, car, availableCars, motorCycle, availableMotorCycles, address, coordinate, rate } = createLocationDto;
        const data = this.create();
        data.admin = req;
        data.locationName = locationName;
        data.cityName = cityName;
        data.car = car;
        data.availableCars = availableCars;
        data.motorCycle = motorCycle;
        data.availableMotorCycles = availableMotorCycles;
        data.address = address;
        data.coordinate = coordinate;
        data.rate = rate;
        try {
            return await data.save();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
};
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto, Object]),
    __metadata("design:returntype", Promise)
], LocationRepository.prototype, "createLocation", null);
LocationRepository = __decorate([
    (0, typeorm_1.EntityRepository)(location_entity_1.Location)
], LocationRepository);
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=location.repository.js.map