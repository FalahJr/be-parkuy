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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const location_repository_1 = require("./repository/location.repository");
const create_location_dto_1 = require("./dto/create-location.dto");
let LocationService = class LocationService {
    constructor(locationRespository) {
        this.locationRespository = locationRespository;
    }
    async getLocationById(id_location) {
        const data = await this.locationRespository.findOne(id_location);
        if (!data) {
            throw new common_1.NotFoundException(`Location with id ${id_location} is not found`);
        }
        return data;
    }
    async createLocation(createLocationDto, req) {
        const location = await this.locationRespository.createLocation(createLocationDto, req);
        if (location) {
            return {
                status: 201,
                message: 'Succesfully created location data',
                data: {
                    id_admin: location.admin.id_admin
                }
            };
        }
    }
    async updateLocation(id_location, updateLocationDto) {
        const { locationName, cityName, car, motorCycle, availableCars, availableMotorCycles, address, coordinate } = updateLocationDto;
        const data = await this.getLocationById(id_location);
        data.locationName = locationName;
        data.cityName = cityName;
        data.car = car;
        data.availableCars = availableCars;
        data.motorCycle = motorCycle;
        data.availableMotorCycles = availableMotorCycles;
        data.address = address;
        data.coordinate = coordinate;
        const save = await data.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Successfully'
            };
        }
    }
    async updateAvailableCapacity(id_location, updateCapacityDto) {
        const { availableCars, availableMotorCycles } = updateCapacityDto;
        const data = await this.getLocationById(id_location);
        data.availableCars = availableCars;
        data.availableMotorCycles = availableMotorCycles;
        const save = await data.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Successfully'
            };
        }
    }
    async updateStatusLocation(id_location, updateStatusLocationDto) {
        const { status } = updateStatusLocationDto;
        const data = await this.getLocationById(id_location);
        data.status = status;
        const save = await data.save();
        if (save) {
            return {
                statusCode: 200,
                message: 'Successfully'
            };
        }
    }
    async getInactiveLocation() {
        const location = await this.locationRespository
            .createQueryBuilder("location")
            .orderBy("location.create_at", "DESC")
            .andWhere("location.status = :status", { status: false });
        return location.getMany();
    }
    async filterLocationNameData(search) {
        let filteredResult;
        if (search) {
            filteredResult = await this.locationRespository.query('SELECT location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate,	location.rate, location.status, admin.id_admin FROM location INNER JOIN admin ON location.adminIdAdmin = admin.id_admin WHERE SOUNDEX(SUBSTRING(location.locationName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?)) ', [search.length, search, search.length]);
        }
        return filteredResult;
    }
    async filterCitynameData(search) {
        let filteredResult;
        if (search) {
            filteredResult = await this.locationRespository.query('SELECT location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate,	location.rate, location.status, admin.id_admin FROM location INNER JOIN admin ON location.adminIdAdmin = admin.id_admin WHERE SOUNDEX(SUBSTRING(location.cityName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?)) ', [search.length, search, search.length]);
        }
        return filteredResult;
    }
    async getLocationData() {
        const getLocation = await this.locationRespository.query('SELECT location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate,	location.rate, location.status, location.create_at, admin.id_admin FROM location INNER JOIN admin ON location.adminIdAdmin = admin.id_admin ORDER BY location.create_at DESC');
        return getLocation;
    }
    async removeLocation(id_location) {
        const result = await this.locationRespository.delete(id_location);
        if (result.affected == 0) {
            throw new common_1.NotFoundException(`Data location with id_location ${id_location} is not found`);
        }
    }
};
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto, Object]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "createLocation", null);
LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_repository_1.LocationRepository)),
    __metadata("design:paramtypes", [location_repository_1.LocationRepository])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map