import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UUIDValidationPipe } from 'src/modules/support/pipes/uuid-validation.pipe';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import RoleGuard from './guard/roles.guard';
import Role from 'src/entities/roles-enum';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreatePetugasDto } from './dto/create-petugas.dto';
import { SetupPetugasDto } from './dto/setup-petugas.dto';
import { JwtGuard } from 'src/utils/jwt.guard';
import { CreatePengendaraDto } from './dto/create-pengendara.dto';
import { SetupPengendaraDto } from './dto/setup-pengendara.dto';
import { SetupBerkasPetugasDto } from './dto/setup-berkas-petugas.dto';
import { Petugas } from '../../../entities/petugas.entity';
import { DataPetugasService } from '../petugas/data-petugas.service';
import { UpdateBerkasPetugasDto } from './dto/update-berkas-petugas.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/api/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly dataPetugasService: DataPetugasService,
  ) { }

  // Register Account
  @Post('register-pengendara')
  async registerPengendara(@Body() createPengendaraDto: CreatePengendaraDto) {
    let role = 'Pengendara';
    return await this.usersService.registerPengendara(createPengendaraDto, role);
  }

  @Post('register-admin')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    let role = 'Admin';
    return await this.usersService.registerAdmin(createAdminDto, role);
  }

  @Post('register-petugas')
  async registerPetugas(@Body() createPetugasDto: CreatePetugasDto) {
    let role = 'Petugas';
    return await this.usersService.registerPetugas(createPetugasDto, role);
  }

  // Account Setup Pengendara/User
  @Put('account-setup-pengendara/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: SetupPengendaraDto })
  async createAccountPengendara(
    @Param('id', UUIDValidationPipe) id_pengendara: string,
    @Body() setupPengendaraDto: SetupPengendaraDto,
  ) {
    return this.usersService.createAccountPengendara(id_pengendara, setupPengendaraDto);
  }

  // Account Setup Petugas
  @Put('account-setup-petugas/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: SetupPetugasDto })
  async createAccountPetugas(
    @Param('id', UUIDValidationPipe) id_petugas: string,
    @Body() setupPetugasDto: SetupPetugasDto,
  ) {
    return this.usersService.createAccountPetugas(id_petugas, setupPetugasDto);
  }

  // Menolak Petugas
  @Put('refuse-officer/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async refuseOfficer(@Param('id', UUIDValidationPipe) id_petugas: string) {
    return this.usersService.refuseOfficer(id_petugas);
  }

  // Menetapkan Tanggal Interview Petugas
  @Put('setup-berkas-petugas/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: SetupBerkasPetugasDto })
  async setupBerkasPetugas(
    @Param('id', UUIDValidationPipe) id_petugas: string,
    @Body() setupBerkasPetugasDto: SetupBerkasPetugasDto,
  ) {
    return this.usersService.setupBerkasPetugas(id_petugas, setupBerkasPetugasDto);
  }

  // Mengupdate Data Berkas Petugas
  @Put('update-berkas-petugas/:id')
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateBerkasPetugasDto })
  async updateBerkasPetugas(
    @Param('id', UUIDValidationPipe) id_petugas: string,
    @Body() updateBerkasPetugasDto: UpdateBerkasPetugasDto,
  ) {
    return this.usersService.updateBerkasPetugas(id_petugas, updateBerkasPetugasDto);
  }

  // Menerima Petugas Bekerja
  @Put('accept-petugas/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async acceptPetugas(@Param('id', UUIDValidationPipe) id_petugas: string) {
    return this.usersService.acceptPetugas(id_petugas);
  }

  @Get()
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async getUser(
    @Param('id', UUIDValidationPipe) id: string
  ): Promise<User> {
    return this.usersService.getUserById(id);
  }

  // Menampilkan Data Pada Tabel Petugas Berdasarkan Id
  @Get('petugas/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async getPetugas(
    @Param('id', UUIDValidationPipe) id: string
  ): Promise<Petugas> {
    return this.dataPetugasService.getPetugasById(id);
  }

  @Get()
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async filterUsers(
    @Query() filter: FilterUserDto
  ): Promise<User[]> {
    return this.usersService.filterUsers(filter);
  }


  @Put('update/:id')
  @UseGuards(JwtGuard)
  async updateUser(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.updateUser(id, payload);
  }

  @Delete('delete/:id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtGuard)
  async removeUser(
    @Param('id', UUIDValidationPipe) id: string
  ): Promise<void> {
    return this.usersService.removeUser(id);
  }

  // @Post("file-upload")
  // @UseInterceptors(FileFieldsInterceptor([
  //   {
  //     name: "filePassportPhoto", maxCount: 1
  //   },
  //   {
  //     name: "fileKtpPhoto", maxCount: 1
  //   }
  // ], {
  //   storage: diskStorage({
  //     destination: Helper.filePath,
  //     filename: Helper.customFileName
  //   }),
  //   limits: {
  //     fileSize: 5000000 //5mb
  //   }
  // }))
  // uploadFile(@UploadedFile() files): string {
  //   return "File upload successfully";
  // }

  // Konfirmasi Email User
  @Get('confirm/:id')
  async confirmEmail(@Param('id', UUIDValidationPipe) id: string) {
    const user = await this.usersService.getUserById(id);
    const userEmail = user.email;
    await this.usersService.confirmEmail(userEmail);
  }
}
