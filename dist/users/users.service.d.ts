import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
export declare class UsersService {
    private readonly userRespository;
    constructor(userRespository: UserRepository);
    register(createUserDto: CreateUserDto): Promise<void>;
    validateUser(email: string, password: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}
