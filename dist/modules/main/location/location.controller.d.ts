import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateStatusLocationDto } from './dto/update-status-location.dto';
import { Location } from 'src/entities/location.entity';
import { UpdateCapacityDto } from './dto/update-available-capacity.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    createLocation(createLocationDto: CreateLocationDto, req: any): Promise<{
        status: number;
        message: string;
        data: {
            id_admin: string;
        };
    }>;
    getLocation(): Promise<any>;
    getLocationId(id_location: string): Promise<Location>;
    updateLocation(id_location: string, updateLocationDto: UpdateLocationDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    updateCapacity(id_location: string, updateCapacityDto: UpdateCapacityDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    updateStatusLocation(id_location: string, updateStatusLocationDto: UpdateStatusLocationDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    inactiveLocation(): Promise<Location[]>;
    removeLocation(id_location: string): Promise<void>;
    filterLocationName(search: string): Promise<any>;
    filterCityName(search: string): Promise<any>;
}
