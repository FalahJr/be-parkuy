import { Repository } from 'typeorm';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User } from '../../../../entities/user.entity';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { CreatePetugasDto } from '../dto/create-petugas.dto';
import { CreatePengendaraDto } from '../dto/create-pengendara.dto';
export declare class UserRepository extends Repository<User> {
    getByEmail(email: string): Promise<User>;
    getAllUser(): Promise<User[]>;
    filterUsers(filter: FilterUserDto): Promise<User[]>;
    createPengendara(createPengendaraDto: CreatePengendaraDto, role: any): Promise<User>;
    createPetugas(createPetugasDto: CreatePetugasDto, role: any): Promise<User>;
    createAdmin(createAdminDto: CreateAdminDto, role: any): Promise<User>;
    validateUser(email: string, password: string): Promise<User>;
    validateAdmin(username: string, password: string): Promise<User>;
}
