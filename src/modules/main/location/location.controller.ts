import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Put,
  Delete,
  Request,
  HttpCode,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UUIDValidationPipe } from 'src/modules/support/pipes/uuid-validation.pipe';
import RoleGuard from '../users/guard/roles.guard';
import Role from 'src/entities/roles-enum';
import { JwtGuard } from 'src/utils/jwt.guard';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateStatusLocationDto } from './dto/update-status-location.dto';
import { Location } from 'src/entities/location.entity';
import { UpdateCapacityDto } from './dto/update-available-capacity.dto';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('/api/location')
@UseInterceptors(ClassSerializerInterceptor)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('create-location')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async createLocation(
    @Body() createLocationDto: CreateLocationDto,
    @Request() req,
  ) {
    return this.locationService.createLocation(
      createLocationDto,
      req.user.admin,
    );
  }

  @Get('get-location')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async getLocation() {
    const location = await this.locationService.getLocationData();

    return location;
  }

  @Get('get-location/:id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async getLocationId(
    @Param('id', UUIDValidationPipe) id_location: string,
  ): Promise<Location> {
    return this.locationService.getLocationById(id_location);
  }

  @Put('update-location/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateLocationDto })
  async updateLocation(
    @Param('id', UUIDValidationPipe) id_location: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(id_location, updateLocationDto);
  }

  @Put('update-available-capacity/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateCapacityDto })
  async updateCapacity(
    @Param('id', UUIDValidationPipe) id_location: string,
    @Body() updateCapacityDto: UpdateCapacityDto,
  ) {
    return this.locationService.updateAvailableCapacity(
      id_location,
      updateCapacityDto,
    );
  }

  @Put('update-status-location/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateStatusLocationDto })
  async updateStatusLocation(
    @Param('id', UUIDValidationPipe) id_location: string,
    @Body() updateStatusLocationDto: UpdateStatusLocationDto,
  ) {
    return this.locationService.updateStatusLocation(
      id_location,
      updateStatusLocationDto,
    );
  }

  @Get('inactive-location')
  @HttpCode(200)
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async inactiveLocation() {
    return this.locationService.getInactiveLocation();
  }

  @Delete('delete-location/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async removeLocation(
    @Param('id', UUIDValidationPipe) id_location: string,
  ): Promise<void> {
    return this.locationService.removeLocation(id_location);
  }

  @Post('search-location-name')
  @UseGuards(JwtGuard)
  async filterLocationName(@Body('search') search: string) {
    const filter = await this.locationService.filterLocationNameData(search);

    return filter;
  }

  @Post('search-city-name')
  @UseGuards(JwtGuard)
  async filterCityName(@Body('search') search: string) {
    const filter = await this.locationService.filterCitynameData(search);

    return filter;
  }
}
