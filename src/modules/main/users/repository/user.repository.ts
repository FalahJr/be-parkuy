import { EntityRepository, Repository } from 'typeorm';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User } from '../../../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { CreatePetugasDto } from '../dto/create-petugas.dto';
import { CreatePengendaraDto } from '../dto/create-pengendara.dto';
import { FilterPetugasDto } from '../dto/filter-petugas.dto';
import { Petugas } from '../../../../entities/petugas.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }

  async getAllUser(): Promise<User[]> {
    const query = this.createQueryBuilder('user');
    return await query.getMany();
  }

  async filterUsers(filter: FilterUserDto): Promise<User[]> {
    const { role } = filter;

    const query = this.createQueryBuilder('user');

    if (role) {
      query.andWhere('lower(user.role) LIKE :role', {
        role: `%${role.toLowerCase()}%`,
      });
    }

    return await query.getMany();
  }

  async createPengendara(createPengendaraDto: CreatePengendaraDto, role) {
    const {
      email,
      password,
    } = createPengendaraDto;

    const user = this.create();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    user.role = role;

    try {
      return await user.save();
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new ConflictException([
          `Email ${email} already used`
        ]);

      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async createPetugas(createPetugasDto: CreatePetugasDto, role) {
    const {
      email,
      password,
    } = createPetugasDto;

    const user = this.create();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    user.role = role;

    try {
      return await user.save();
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new ConflictException([
          `Email ${email} already used`
        ]);

      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto, role) {
    const {
      username,
      password,
    } = createAdminDto;

    const user = this.create();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    user.role = role;

    try {
      return await user.save();
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new ConflictException([
          `Username ${username} already used`
        ]);

      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user_email = await this.findOne({ email });
    if (user_email && (await user_email.validatePassword(password))) {
      return user_email;
    }
    return null;
  }

  async validateAdmin(username: string, password: string): Promise<User> {
    const admin_username = await this.findOne({ username });

    if (admin_username && (await admin_username.validatePassword(password))) {
      return admin_username;
    }
    return null;
  }
}
