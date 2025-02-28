import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  Query,
  Delete,
  UseGuards,
  Put,
  Body,
  Request,
  Post,
  HttpCode,
} from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import Role from 'src/entities/roles-enum';
import { UUIDValidationPipe } from 'src/modules/support/pipes/uuid-validation.pipe';
import { JwtGuard } from 'src/utils/jwt.guard';
import { Petugas } from '../../../entities/petugas.entity';
import { FilterPetugasDto } from '../users/dto/filter-petugas.dto';
import RoleGuard from '../users/guard/roles.guard';
import { DataPetugasService } from './data-petugas.service';
import { UpdateLocationPetugasDto } from './dto/update-location-petugas.dto';
import { UpdatePetugasDto } from './dto/update-petugas.dto';
import { UpdateStatusPetugasDto } from './dto/update-status-petugas.dto';

@ApiTags('Petugas')
@ApiBearerAuth()
@Controller('/api/petugas')
@UseInterceptors(ClassSerializerInterceptor)
export class DataPetugasController {
  constructor(
    private readonly dataPetugasService: DataPetugasService,
  ) { }

  @Get('scan-petugas')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async scan(@Request() req) {
    return this.dataPetugasService.scan(req.user.petugas);
  }

  @Get('search-petugas')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async filterPetugas(
    @Query() filter: FilterPetugasDto
  ): Promise<Petugas[]> {
    return this.dataPetugasService.filterPetugas(filter);
  }

  @Delete('delete-petugas/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async removePetugas(
    @Param('id', UUIDValidationPipe) id_petugas: string
  ): Promise<void> {
    return this.dataPetugasService.removePetugas(id_petugas);
  }

  @Get('berkas-petugas')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async getBerkasPetugas() {
    const file = this.dataPetugasService.getBerkasPetugas();
    return file;
  }

  @Get('berkas-petugas/:id')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async getBerkasPetugasId(
    @Param('id', UUIDValidationPipe) id_petugas: string
  ): Promise<Petugas> {
    return this.dataPetugasService.getBerkasPetugasById(id_petugas);
  }

  @Post('berkas-petugas-name')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async berkasPetugasByName(
    @Body('fullName') fullName: string
  ) {
    const filter = await this.dataPetugasService.getBerkasPetugasByName(fullName);

    return filter;
  }

  @Post('get-petugas-name')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async getPetugasByName(
    @Body('fullName') fullName: string
  ) {
    const filter = await this.dataPetugasService.getPetugasByName(fullName);

    return filter;
  }

  @Put('update-petugas/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdatePetugasDto })
  async updatePetugas(
    @Param('id', UUIDValidationPipe) id_petugas: string,
    @Body() updatePetugasDto: UpdatePetugasDto,
  ) {
    return this.dataPetugasService.updatePetugas(id_petugas, updatePetugasDto);
  }

  @Put('update-location-petugas/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateLocationPetugasDto })
  async updateLocationPetugas(
    @Param('id', UUIDValidationPipe) id_petugas: string,
    @Body() updateLocationPetugasDto: UpdateLocationPetugasDto,
  ) {
    return this.dataPetugasService.updateLocationPetugas(id_petugas, updateLocationPetugasDto);
  }

  @Put('update-status-petugas/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateStatusPetugasDto })
  async updateStatusPetugas(
    @Param('id', UUIDValidationPipe) id_petugas: string,
    @Body() updateStatusPetugasDto: UpdateStatusPetugasDto,
  ) {
    return this.dataPetugasService.updateStatusPetugas(id_petugas, updateStatusPetugasDto);
  }

  @Get('detail-parkir-petugas/:id')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async filterParkingPetugas(
    @Param('id', UUIDValidationPipe) id_petugas: string,
  ) {
    const filter = await this.dataPetugasService.listVehiclesById(id_petugas);
    return {
      filter
    };
  }

  @Get('list-vehicles-method/:id')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async filterListVehicles(
    @Param('id', UUIDValidationPipe) id_petugas: string,
  ) {
    const filter = await this.dataPetugasService.listVehiclesByMethod(id_petugas);
    return {
      filter
    };
  }

  @Post('list-vehicles-nopol')
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async listVehiclesByNopol(
    @Body('id_petugas') id_petugas: string,
    @Body('nopol') nopol: string
  ) {
    const filter = await this.dataPetugasService.listVehiclesByNopol(id_petugas, nopol);
    return {
      filter
    };
  }

  @Get('parking-history/:id')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async filterParkingHistory(
    @Param('id', UUIDValidationPipe) id_petugas: string,
  ): Promise<Petugas> {
    return this.dataPetugasService.filteredParkingHistory(id_petugas);
  }

  @Post('parking-history-nopol')
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async parkingHistoryNopol(
    @Body('id_petugas') id_petugas: string,
    @Body('nopol') nopol: string
  ): Promise<Petugas> {
    return this.dataPetugasService.parkingHistoryNopol(id_petugas, nopol);
  }

  // @Put('status-petugas')
  // @UseGuards(RoleGuard(Role.Petugas))
  // @UseGuards(JwtGuard)
  // async statusPetugas(@Request() req) {
  //   return this.dataPetugasService.statusPetugas(req.user.id)
  // }

  @Get('accepted-by-location/:id')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async officerAcceptedLocation(
    @Param('id', UUIDValidationPipe) id_petugas: string,
  ) {
    return this.dataPetugasService.officerAcceptedLocationById(id_petugas);
  }

  @Get('petugas-diterima')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async getPetugasDiterima() {
    const getPetugasDiterima = this.dataPetugasService.getPetugasDiterima();
    return getPetugasDiterima;
  }

  @Get('petugas-belum-diterima')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async getPetugasBelumDiterima() {
    const getPetugasBelumDiterima = this.dataPetugasService.getPetugasBelumDiterima();
    return getPetugasBelumDiterima;
  }

  @Get('filter-location-city-name')
  // @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async filteredPetugasLocation(
    @Body('search') search: string
  ): Promise<Petugas> {
    return this.dataPetugasService.filteredPetugasLocation(search);
  }

  @Post('filter-parking-out-nopol')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async filteredParkingOutNopol(
    @Body('id_petugas') id_petugas: string,
    @Body('nopol') nopol: string
  ) {
    const filter = await this.dataPetugasService.filteredParkingOutNopol(id_petugas, nopol);
    return {
      filter
    };
  }

  @Post('filter-kendaraan')
  // @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async filteredKendaraan(
    @Body('search') search: string
  ) {
    const filter = await this.dataPetugasService.filteredKendaraan(search);

    return {
      filter: filter,
    };
  }


  @Post('list-location-name')
  @UseGuards(JwtGuard)
  async listParkingByLocationName(
    @Body('locationName') locationName: string
  ) {
    const filter = await this.dataPetugasService.listParkingByLocationName(locationName);
    return {
      filter
    };
  }

  @Post('list-location-city')
  @UseGuards(JwtGuard)
  async listParkingByLocationCityName(
    @Body('cityName') cityName: string
  ) {
    const filter = await this.dataPetugasService.listParkingByLocationCityName(cityName);
    return {
      filter
    };
  }
}
