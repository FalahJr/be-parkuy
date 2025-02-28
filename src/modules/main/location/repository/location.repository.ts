import { Location } from 'src/entities/location.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
import { InternalServerErrorException, Request } from '@nestjs/common';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  async createLocation(createLocationDto: CreateLocationDto, @Request() req): Promise<Location> {
    const {
      locationName,
      cityName,
      car,
      availableCars,
      motorCycle,
      availableMotorCycles,
      address,
      coordinate,
      rate
    } = createLocationDto;

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
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

  }

}
