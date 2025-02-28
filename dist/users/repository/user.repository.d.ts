import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
export declare class UserRepository extends Repository<User> {
    register(createUserDto: CreateUserDto): Promise<void>;
    validateUser(email: string, password: string): Promise<User>;
}
