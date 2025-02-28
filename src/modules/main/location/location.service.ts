import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from './repository/location.repository';
import { Location } from '../../../entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private readonly locationRespository: LocationRepository,
  ) { }

  async getLocationById(id_location: string): Promise<Location> {
    const data = await this.locationRespository.findOne(id_location);
    if (!data) {
      throw new NotFoundException(`Location with id ${id_location} is not found`);
    }
    return data;
  }

  async createLocation(createLocationDto: CreateLocationDto, @Request() req) {
    const location = await this.locationRespository.createLocation(createLocationDto, req);
    if (location) {
      return {
        status: 201,
        message: 'Succesfully created location data',
        data: {
          id_admin: location.admin.id_admin
        }
      }
    }
  }

  async updateLocation(id_location: string, updateLocationDto) {
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
      }
    }
  }

  async updateAvailableCapacity(id_location: string, updateCapacityDto) {
    const { availableCars, availableMotorCycles } = updateCapacityDto;

    const data = await this.getLocationById(id_location);
    data.availableCars = availableCars;
    data.availableMotorCycles = availableMotorCycles;

    const save = await data.save();
    if (save) {
      return {
        statusCode: 200,
        message: 'Successfully'
      }
    }
  }

  async updateStatusLocation(id_location: string, updateStatusLocationDto) {
    const { status } = updateStatusLocationDto;

    const data = await this.getLocationById(id_location);
    data.status = status;

    const save = await data.save();
    if (save) {
      return {
        statusCode: 200,
        message: 'Successfully'
      }
    }
  }

  async getInactiveLocation() {
    const location = await this.locationRespository
      .createQueryBuilder("location")
      .orderBy("location.create_at", "DESC")
      .andWhere("location.status = :status", { status: false })

    return location.getMany();
  }

  async filterLocationNameData(
    search: string,
  ) {
    let filteredResult;

    if (search) {
      filteredResult = await this.locationRespository.query(
        'SELECT location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate,	location.rate, location.status, admin.id_admin FROM location INNER JOIN admin ON location.adminIdAdmin = admin.id_admin WHERE SOUNDEX(SUBSTRING(location.locationName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?)) ',
        [search.length, search, search.length],
      );
    }

    return filteredResult;

  }

  async filterCitynameData(
    search: string,
  ) {
    let filteredResult;

    if (search) {
      filteredResult = await this.locationRespository.query(
        'SELECT location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate,	location.rate, location.status, admin.id_admin FROM location INNER JOIN admin ON location.adminIdAdmin = admin.id_admin WHERE SOUNDEX(SUBSTRING(location.cityName, 1, ?)) = SOUNDEX(SUBSTRING(?, 1, ?)) ',
        [search.length, search, search.length],
      );
    }

    return filteredResult;

  }

  async getLocationData() {
    const getLocation = await this.locationRespository.query(
      'SELECT location.id_location, location.locationName, location.cityName, location.car, location.motorCycle, location.availableCars, location.availableMotorCycles, location.address, location.coordinate,	location.rate, location.status, location.create_at, admin.id_admin FROM location INNER JOIN admin ON location.adminIdAdmin = admin.id_admin ORDER BY location.create_at DESC',
    );

    return getLocation;
  }

  async removeLocation(id_location: string): Promise<void> {
    const result = await this.locationRespository.delete(id_location);
    if (result.affected == 0) {
      throw new NotFoundException(`Data location with id_location ${id_location} is not found`);
    }
  }

}
