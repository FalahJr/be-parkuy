import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { SetupUserDto } from './dto/setup-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import CreateOtpDto from '../../../../dist/modules/main/users/dto/create-otp.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: string;
            email: string;
            role: string;
            emailVerified: boolean;
            status_petugas: boolean;
        };
    }>;
    registerAdmin(createAdminDto: CreateAdminDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id_admin: string;
            username: string;
            role: string;
        };
    }>;
    createAccount(id: string, payload: SetupUserDto): Promise<void>;
    getAllUsers(): Promise<User[]>;
    getUser(id: string): Promise<User>;
    filterUsers(filter: FilterUserDto, req: any): Promise<User[]>;
    updateUser(id: string, payload: UpdateUserDto): Promise<void>;
    removeUser(id: string): Promise<void>;
    uploadFile(files: any): string;
    confirmEmail(body: CreateOtpDto): Promise<void>;
}
