import { User } from 'src/entities/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreatePetugasDto } from './dto/create-petugas.dto';
import { SetupPetugasDto } from './dto/setup-petugas.dto';
import { CreatePengendaraDto } from './dto/create-pengendara.dto';
import { SetupPengendaraDto } from './dto/setup-pengendara.dto';
import { SetupBerkasPetugasDto } from './dto/setup-berkas-petugas.dto';
import { Petugas } from '../../../entities/petugas.entity';
import { DataPetugasService } from '../petugas/data-petugas.service';
import { UpdateBerkasPetugasDto } from './dto/update-berkas-petugas.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly dataPetugasService;
    constructor(usersService: UsersService, dataPetugasService: DataPetugasService);
    registerPengendara(createPengendaraDto: CreatePengendaraDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: string;
            email: string;
            role: string;
            emailVerified: boolean;
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
    registerPetugas(createPetugasDto: CreatePetugasDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: string;
            email: string;
            role: string;
            emailVerified: boolean;
        };
    }>;
    createAccountPengendara(id_pengendara: string, setupPengendaraDto: SetupPengendaraDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    createAccountPetugas(id_petugas: string, setupPetugasDto: SetupPetugasDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    refuseOfficer(id_petugas: string): Promise<{
        message: string;
    }>;
    setupBerkasPetugas(id_petugas: string, setupBerkasPetugasDto: SetupBerkasPetugasDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    updateBerkasPetugas(id_petugas: string, updateBerkasPetugasDto: UpdateBerkasPetugasDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    acceptPetugas(id_petugas: string): Promise<{
        message: string;
    }>;
    getAllUsers(): Promise<User[]>;
    getUser(id: string): Promise<User>;
    getPetugas(id: string): Promise<Petugas>;
    filterUsers(filter: FilterUserDto): Promise<User[]>;
    updateUser(id: string, payload: UpdateUserDto): Promise<void>;
    removeUser(id: string): Promise<void>;
    confirmEmail(id: string): Promise<void>;
}
