import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Query,
  Request,
  Put,
  Param,
  HttpCode,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import RoleGuard from '../users/guard/roles.guard';
import Role from 'src/entities/roles-enum';
import { JwtGuard } from 'src/utils/jwt.guard';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UUIDValidationPipe } from 'src/modules/support/pipes/uuid-validation.pipe';
import { PayForParkingDto } from './dto/pay-for-parking.dto';
import { Parking } from 'src/entities/parking.entity';
import { UpdateParkingDto } from './dto/update-parking.dto';

@ApiTags('Parking')
@ApiBearerAuth()
@Controller('/api/parking')
@UseInterceptors(ClassSerializerInterceptor)
export class ParkingController {
  constructor(
    private readonly parkingService: ParkingService,
  ) { }

  @Post('create-parking')
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async createParking(@Body() createParkingDto: CreateParkingDto, @Request() req) {
    return this.parkingService.createParking(createParkingDto, req.user.petugas);
  }

  @Put('update-parking/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateParkingDto })
  async updateParking(
    @Param('id', UUIDValidationPipe) id_parking: string,
    @Body() updateParkingDto: UpdateParkingDto,
  ) {
    return this.parkingService.updateParking(id_parking, updateParkingDto);
  }

  @Put('bayar-parkir/:id')
  @UseGuards(RoleGuard(Role.Petugas))
  @UseGuards(JwtGuard)
  async bayarParkir(
    @Param('id', UUIDValidationPipe) id_parking: string,
    @Body() payForParkingDto: PayForParkingDto
  ) {
    return this.parkingService.payForParking(id_parking, payForParkingDto);
  }

  @Get('parking-entrance')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async parkingEntrance() {
    return this.parkingService.getParkingEntrance();
  }

  @Get('parking-entrance/:id')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async parkingEntranceById(
    @Param('id', UUIDValidationPipe) id_parking: string
  ): Promise<Parking> {
    return this.parkingService.getParkingEntranceById(id_parking);
  }

  @Get('parking-out')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async parkingOut() {
    return this.parkingService.getParkingOut();
  }

  @Get('parking-out/:id')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async parkingOutById(
    @Param('id', UUIDValidationPipe) id_parking: string
  ): Promise<Parking> {
    return this.parkingService.getParkingOutById(id_parking);
  }
}
