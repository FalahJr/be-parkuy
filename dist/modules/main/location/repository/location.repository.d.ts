import { Location } from 'src/entities/location.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
export declare class LocationRepository extends Repository<Location> {
    createLocation(createLocationDto: CreateLocationDto, req: any): Promise<Location>;
}
