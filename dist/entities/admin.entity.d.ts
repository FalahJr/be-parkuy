import { BaseEntity } from 'typeorm';
import { Location } from './location.entity';
import { User } from './user.entity';
export declare class Admin extends BaseEntity {
    id_admin: string;
    user: User;
    location: Location;
}
