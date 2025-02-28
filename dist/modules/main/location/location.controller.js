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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const location_service_1 = require("./location.service");
const create_location_dto_1 = require("./dto/create-location.dto");
const uuid_validation_pipe_1 = require("../../support/pipes/uuid-validation.pipe");
const roles_guard_1 = require("../users/guard/roles.guard");
const roles_enum_1 = require("../../../entities/roles-enum");
const jwt_guard_1 = require("../../../utils/jwt.guard");
const update_location_dto_1 = require("./dto/update-location.dto");
const update_status_location_dto_1 = require("./dto/update-status-location.dto");
const update_available_capacity_dto_1 = require("./dto/update-available-capacity.dto");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    async createLocation(createLocationDto, req) {
        return this.locationService.createLocation(createLocationDto, req.user.admin);
    }
    async getLocation() {
        const location = await this.locationService.getLocationData();
        return location;
    }
    async getLocationId(id_location) {
        return this.locationService.getLocationById(id_location);
    }
    async updateLocation(id_location, updateLocationDto) {
        return this.locationService.updateLocation(id_location, updateLocationDto);
    }
    async updateCapacity(id_location, updateCapacityDto) {
        return this.locationService.updateAvailableCapacity(id_location, updateCapacityDto);
    }
    async updateStatusLocation(id_location, updateStatusLocationDto) {
        return this.locationService.updateStatusLocation(id_location, updateStatusLocationDto);
    }
    async inactiveLocation() {
        return this.locationService.getInactiveLocation();
    }
    async removeLocation(id_location) {
        return this.locationService.removeLocation(id_location);
    }
    async filterLocationName(search) {
        const filter = await this.locationService.filterLocationNameData(search);
        return filter;
    }
    async filterCityName(search) {
        const filter = await this.locationService.filterCitynameData(search);
        return filter;
    }
};
__decorate([
    (0, common_1.Post)('create-location'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "createLocation", null);
__decorate([
    (0, common_1.Get)('get-location'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocation", null);
__decorate([
    (0, common_1.Get)('get-location/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationId", null);
__decorate([
    (0, common_1.Put)('update-location/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_location_dto_1.UpdateLocationDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Put)('update-available-capacity/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_available_capacity_dto_1.UpdateCapacityDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_available_capacity_dto_1.UpdateCapacityDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateCapacity", null);
__decorate([
    (0, common_1.Put)('update-status-location/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBody)({ type: update_status_location_dto_1.UpdateStatusLocationDto }),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_location_dto_1.UpdateStatusLocationDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateStatusLocation", null);
__decorate([
    (0, common_1.Get)('inactive-location'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "inactiveLocation", null);
__decorate([
    (0, common_1.Delete)('delete-location/:id'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "removeLocation", null);
__decorate([
    (0, common_1.Post)('search-location-name'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "filterLocationName", null);
__decorate([
    (0, common_1.Post)('search-city-name'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "filterCityName", null);
LocationController = __decorate([
    (0, swagger_1.ApiTags)('Location'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/api/location'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map