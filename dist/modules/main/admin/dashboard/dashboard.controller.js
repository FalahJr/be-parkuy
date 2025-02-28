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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const jwt_guard_1 = require("../../../../utils/jwt.guard");
const roles_guard_1 = require("../../users/guard/roles.guard");
const roles_enum_1 = require("../../../../entities/roles-enum");
const swagger_1 = require("@nestjs/swagger");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboards() {
        const getDashboards = await this.dashboardService.getDashboards();
        return getDashboards;
    }
    async getPetugasDashboards(search) {
        const getPetugasDashboards = await this.dashboardService.getPetugasDashboards(search);
        return {
            getPetugasDashboards: getPetugasDashboards,
        };
    }
    async getTransaction(search, status_bayar) {
        const filter = await this.dashboardService.getTotalTransaction(search, status_bayar);
        return {
            filter: filter,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Admin)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboards", null);
__decorate([
    (0, common_1.Post)('dashboard-mobile'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getPetugasDashboards", null);
__decorate([
    (0, common_1.Post)('total-transaction'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(roles_enum_1.default.Petugas)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('search')),
    __param(1, (0, common_1.Body)('status_bayar')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTransaction", null);
DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/api/admin/dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map