import { FilterUserDto } from './dto/filter-user.dto';
import { User } from '../../../entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import EmailService from 'src/modules/support/email/email.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminRepository } from './repository/admin.repository';
import { CreatePetugasDto } from './dto/create-petugas.dto';
import { PengendaraRepository } from '../pengendara/repository/pengendara.repository';
import { CreatePengendaraDto } from './dto/create-pengendara.dto';
import { Pengendara } from '../../../entities/pengendara.entity';
import { DataPetugasRepository } from '../petugas/repository/data-petugas.repository';
import { DataPetugasService } from '../petugas/data-petugas.service';
export declare class UsersService {
    private readonly userRespository;
    private readonly adminRespository;
    private readonly dataPetugasRespository;
    private readonly pengendaraRespository;
    private readonly jwtService;
    private readonly emailService;
    private readonly dataPetugasService;
    constructor(userRespository: UserRepository, adminRespository: AdminRepository, dataPetugasRespository: DataPetugasRepository, pengendaraRespository: PengendaraRepository, jwtService: JwtService, emailService: EmailService, dataPetugasService: DataPetugasService);
    registerPengendara(createPengendaraDto: CreatePengendaraDto, role: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: string;
            email: string;
            role: string;
            emailVerified: boolean;
        };
    }>;
    registerPetugas(createPetugasDto: CreatePetugasDto, role: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: string;
            email: string;
            role: string;
            emailVerified: boolean;
        };
    }>;
    registerAdmin(createAdminDto: CreateAdminDto, role: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            id_admin: string;
            username: string;
            role: string;
        };
    }>;
    createAccountPengendara(id_pengendara: string, setupPengendaraDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    createAccountPetugas(id_petugas: string, setupPetugasDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    setupBerkasPetugas(id_petugas: string, setupBerkasPetugasDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    updateBerkasPetugas(id_petugas: string, updateBerkasPetugasDto: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    acceptPetugas(id_petugas: string): Promise<{
        message: string;
    }>;
    refuseOfficer(id_petugas: string): Promise<{
        message: string;
    }>;
    checkVerifiedEmail(email: string): Promise<boolean>;
    EmailHasBeenConfirmed(email: string): Promise<import("typeorm").UpdateResult>;
    getByEmail(email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getPengendaraById(id: string): Promise<Pengendara>;
    filterUsers(filter: FilterUserDto): Promise<User[]>;
    updateUser(id: string, updateUserDto: any): Promise<void>;
    validateUser(email: string, password: string): Promise<User>;
    validateAdmin(username: string, password: string): Promise<User>;
    findUserById(id: string): Promise<User>;
    removeUser(id: string): Promise<void>;
    sendVerificationLink(email: string, id: string): Promise<any>;
    sendForgetPasswordLink(email: string): Promise<any>;
    confirmEmail(email: string): Promise<{
        statusCode: number;
        message: string;
    }>;
    decodeConfirmationToken(token: string): Promise<any>;
    resetPassword(email: string, resetPasswordDto: any): Promise<{
        statuCode: number;
        message: string;
    }>;
    resetPasswordProfile(email: string, resetPasswordDto: any): Promise<{
        statuCode: number;
        message: string;
    }>;
}
