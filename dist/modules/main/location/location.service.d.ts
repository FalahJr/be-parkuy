import { LocationRepository } from './repository/location.repository';
import { Location } from '../../../entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationService {
    private readonly locationRespository;
    constructor(locationRespository: LocationRepository);
    getLocationById(id_location: string): Promise<Location>;
    createLocation(createLocationDto: CreateLocationDto, req: any): Promise<{
        status: number;
        message: string;
        data: {
            id_admin: string;
        };
    }>;
    updateLocation(id_location: string, updateLocationDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    updateAvailableCapacity(id_location: string, updateCapacityDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    updateStatusLocation(id_location: string, updateStatusLocationDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    getInactiveLocation(): Promise<Location[]>;
    filterLocationNameData(search: string): Promise<any>;
    filterCitynameData(search: string): Promise<any>;
    getLocationData(): Promise<any>;
    removeLocation(id_location: string): Promise<void>;
}
