import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterUserDto } from './dto/filter-user.dto';
import { User } from '../../../entities/user.entity';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import EmailService from 'src/modules/support/email/email.service';
import { jwtConfig } from 'src/config/jwt.config';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminRepository } from './repository/admin.repository';
import { CreatePetugasDto } from './dto/create-petugas.dto';
import { PengendaraRepository } from '../pengendara/repository/pengendara.repository';
import { CreatePengendaraDto } from './dto/create-pengendara.dto';
import { Pengendara } from '../../../entities/pengendara.entity';
import { DataPetugasRepository } from '../petugas/repository/data-petugas.repository';
import { DataPetugasService } from '../petugas/data-petugas.service';
import { SetupPengendaraDto } from './dto/setup-pengendara.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    @InjectRepository(AdminRepository)
    @InjectRepository(DataPetugasRepository)
    @InjectRepository(PengendaraRepository)
    private readonly userRespository: UserRepository,
    private readonly adminRespository: AdminRepository,
    private readonly dataPetugasRespository: DataPetugasRepository,
    private readonly pengendaraRespository: PengendaraRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly dataPetugasService: DataPetugasService,
  ) { }

  async registerPengendara(createPengendaraDto: CreatePengendaraDto, role) {
    const user = await this.userRespository.createPengendara(createPengendaraDto, role);
    const sendLink = await this.sendVerificationLink(user.email, user.id);
    if (user) {
      const pengendara = await this.pengendaraRespository.createPengendara(user);
      return {
        statusCode: 201,
        message: 'Successfully register',
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
        }
      }
    }
  }

  async registerPetugas(createPetugasDto: CreatePetugasDto, role) {
    const user = await this.userRespository.createPetugas(createPetugasDto, role);
    const sendLink = await this.sendVerificationLink(user.email, user.id);
    if (user) {
      const petugas = await this.dataPetugasRespository.createPetugas(user);
      return {
        statusCode: 201,
        message: 'Successfully register',
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
        }
      }
    }
  }

  async registerAdmin(createAdminDto: CreateAdminDto, role) {
    const user = await this.userRespository.createAdmin(createAdminDto, role);
    if (user) {
      const admin = await this.adminRespository.createAdmin(user);
      return {
        statusCode: 201,
        message: 'Successfully register',
        data: {
          id_admin: user.id,
          username: user.username,
          role: user.role,
        }
      }
    }
  }

  async createAccountPengendara(id_pengendara: string, setupPengendaraDto) {
    const { fullName, phone, cityName, address, nopol, jenis_kendaraan } = setupPengendaraDto;

    const user = await this.getPengendaraById(id_pengendara);
    user.fullName = fullName;
    user.phone = phone;
    user.cityName = cityName;
    user.address = address;
    user.nopol = nopol;
    user.jenis_kendaraan = jenis_kendaraan;

    const save = await user.save();

    if (save) {
      return {
        statusCode: 200,
        message: 'Successfully Account Setup Pengendara'
      }
    }
  }

  async createAccountPetugas(id_petugas: string, setupPetugasDto) {
    const { fullName, cityName, address, phone, } = setupPetugasDto;

    const user = await this.dataPetugasService.getPetugasById(id_petugas);
    user.fullName = fullName;
    user.cityName = cityName;
    user.address = address;
    user.phone = phone;
    // user.photo = photo;
    // user.ktp_photo = ktp_photo;

    const save = await user.save();

    if (save) {
      return {
        statusCode: 200,
        message: 'Successfully Account Setup Petugas'
      }
    }
  }

  async setupBerkasPetugas(id_petugas: string, setupBerkasPetugasDto) {
    const { date } = setupBerkasPetugasDto;

    const user = await this.dataPetugasService.getPetugasById(id_petugas);
    user.date = date;

    const save = await user.save();
    if (save) {
      return {
        statusCode: 200,
        message: 'Succesfully'
      }
    }
  }

  async updateBerkasPetugas(id_petugas: string, updateBerkasPetugasDto) {
    const { fullName, cityName, address, phone } = updateBerkasPetugasDto;

    const user = await this.dataPetugasService.getPetugasById(id_petugas);
    user.fullName = fullName;
    user.cityName = cityName;
    user.address = address;
    user.phone = phone;
    // user.photo = photo;
    // user.ktp_photo = ktp_photo;

    const save = await user.save();
    if (save) {
      return {
        statusCode: 200,
        message: 'Succesfully'
      }
    }
  }

  async acceptPetugas(id_petugas: string) {
    const data = await this.dataPetugasService.getPetugasById(id_petugas);

    data.status_bekerja = "Sudah diterima"
    await data.save();
    return {
      message: `Successfully accept petugas`
    }
  }

  async refuseOfficer(id_petugas: string) {
    const data = await this.dataPetugasService.getPetugasById(id_petugas);

    data.status_bekerja = "Ditolak",
      data.user.emailVerified = false
    await data.user.save();
    await data.save();
    return {
      message: `successfully refuse officer`
    }
  }

  async checkVerifiedEmail(email: string) {
    const verified = await this.userRespository.findOne({ where: { email } });

    if (verified.emailVerified) {
      return true;
    } else {
      return false;
    }
  }


  async EmailHasBeenConfirmed(email: string) {
    return this.userRespository.update({ email }, {
      emailVerified: true
    });
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRespository.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRespository.getAllUser();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRespository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }
    return user;
  }

  async getPengendaraById(id: string): Promise<Pengendara> {
    const pengendara = await this.pengendaraRespository.findOne(id);
    if (!pengendara) {
      throw new NotFoundException(`Pengendara with id ${id} is not found`);
    }
    return pengendara;
  }

  async filterUsers(filter: FilterUserDto): Promise<User[]> {
    return await this.userRespository.filterUsers(filter);
  }

  async updateUser(id: string, updateUserDto): Promise<void> {
    const { username } = updateUserDto;

    const user = await this.getUserById(id);
    user.username = username;

    await user.save();
  }

  async validateUser(email: string, password: string): Promise<User> {
    return await this.userRespository.validateUser(email, password);
  }

  async validateAdmin(username: string, password: string): Promise<User> {
    return await this.userRespository.validateAdmin(username, password);
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRespository.findOne(id);
  }

  async removeUser(id: string): Promise<void> {
    const result = await this.userRespository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }
  }

  async sendVerificationLink(email: string, id: string) {

    const url = `${process.env.EMAIL_CONFIRMATION_URL}${id}`;

    const html = `<b>Welcome to the Parkuy. To confirm the email address, click here: </b> <p> ${url}</p>`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      html,
    })
  }

  async sendForgetPasswordLink(email: string) {
    const user = await this.getByEmail(email);

    if (!user) {
      throw new BadRequestException('Email not found');
    } else {
      const payload = {
        email: email
      }
      const token = this.jwtService.sign(payload);

      const url = `${process.env.RESET_PASSWORD_URL}?token=${token}`;

      const html = `<b>Welcome to the Parkuy. To reset your password, please click this url: </b> <p> ${url}</p>`;

      return this.emailService.sendMail({
        to: email,
        subject: 'Reset Password',
        html,
      })
    }
  }

  async confirmEmail(email: string) {
    const user = await this.getByEmail(email);
    if (user.emailVerified) {
      throw new BadRequestException('Email already confirmed');
    } else {
      const confirm = await this.EmailHasBeenConfirmed(email);
      return {
        statusCode: 201,
        message: 'Email confirmation successfully'
      };
    }
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: jwtConfig.secret,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  async resetPassword(email: string, resetPasswordDto) {
    const { password } = resetPasswordDto;

    const user = await this.getByEmail(email);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    const save = await user.save();
    if (save) {
      return {
        statuCode: 201,
        message: 'Successfully changed password'
      }
    }
  }

  async resetPasswordProfile(email: string, resetPasswordDto) {
    const { password } = resetPasswordDto;

    const user = await this.getByEmail(email);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    const save = await user.save();
    if (save) {
      return {
        statuCode: 201,
        message: 'Successfully changed password'
      }
    }
  }

}
