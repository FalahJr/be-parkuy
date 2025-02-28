import { Body, Controller, Get, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Pengendara } from 'src/entities/pengendara.entity';
import Role from 'src/entities/roles-enum';
import { UUIDValidationPipe } from 'src/modules/support/pipes/uuid-validation.pipe';
import { JwtGuard } from 'src/utils/jwt.guard';
import RoleGuard from '../users/guard/roles.guard';
import { UpdatePengendaraDto } from './dto/update-pengendara.dto';
import { PengendaraService } from './pengendara.service';
import { UpdateStatusParkirPengendaraDto } from './dto/update-status-parkir-pengendara.dto';
import { UpdateStatusPengendaraDto } from './dto/update-status-pengendara.dto';

@ApiTags('Pengendara')
@ApiBearerAuth()
@Controller('/api/pengendara')
export class PengendaraController {
  constructor(
    private readonly pengendaraService: PengendaraService,
  ) { }

  @Get('get-pengendara')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async getPengendara() {
    return this.pengendaraService.getAllPengendara();
  }

  @Get('detail-pengendara/:id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async getPengendaraById(
    @Param('id', UUIDValidationPipe) id_pengendara: string,
  ): Promise<Pengendara> {
    return this.pengendaraService.getPengendaraById(id_pengendara);
  }

  @Get('detail-parking-pengendara/:id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async getPengendaraByLocation(
    @Param('id', UUIDValidationPipe) id_pengendara: string,
  ): Promise<Pengendara> {
    return this.pengendaraService.getPengendaraByLocation(id_pengendara);
  }

  @Put('update-pengendara/:id')
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdatePengendaraDto })
  async updatePengendara(
    @Param('id', UUIDValidationPipe) id_pengendara: string,
    @Body() updatePengendaraDto: UpdatePengendaraDto,
  ) {
    return this.pengendaraService.updatePengendara(id_pengendara, updatePengendaraDto);
  }

  @Put('update-status-pengendara/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateStatusPengendaraDto })
  async updateStatusPetugas(
    @Param('id', UUIDValidationPipe) id_pengendara: string,
    @Body() updateStatusPengendaraDto: UpdateStatusPengendaraDto
  ) {
    return this.pengendaraService.updateStatusPengendara(id_pengendara, updateStatusPengendaraDto);
  }

  @Put('status-parkir-pengendara/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateStatusParkirPengendaraDto })
  async statusParkir(
    @Param('id', UUIDValidationPipe) id_pengendara: string,
    @Body() updateStatusParkirPengendaraDto: UpdateStatusParkirPengendaraDto
  ) {
    return this.pengendaraService.statusParkirPengendara(id_pengendara, updateStatusParkirPengendaraDto);
  }
}
