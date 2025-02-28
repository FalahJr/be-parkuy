import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { DashboardService } from "./dashboard.service";
import { JwtGuard } from '../../../../utils/jwt.guard';
import RoleGuard from '../../users/guard/roles.guard';
import Role from 'src/entities/roles-enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UUIDValidationPipe } from 'src/modules/support/pipes/uuid-validation.pipe';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('/api/admin/dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) { }

  @Get()
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async getDashboards() {
    const getDashboards = await this.dashboardService.getDashboards();
    return getDashboards;
  }

  @Post('dashboard-mobile')
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async getPetugasDashboards(
    @Body('search') search: string
  ) {
    const getPetugasDashboards = await this.dashboardService.getPetugasDashboards(search);

    return {
      getPetugasDashboards: getPetugasDashboards,
    };
  }

  @Post('total-transaction')
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async getTransaction(
    @Body('search') search: string,
    @Body('status_bayar') status_bayar: string
  ) {
    const filter = await this.dashboardService.getTotalTransaction(search, status_bayar);

    return {
      filter: filter,
    };
  }
}