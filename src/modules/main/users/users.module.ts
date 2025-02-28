import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/modules/support/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { AdminRepository } from './repository/admin.repository';
import { PengendaraRepository } from '../pengendara/repository/pengendara.repository';
import { DataPetugasRepository } from '../petugas/repository/data-petugas.repository';
import { DataPetugasService } from '../petugas/data-petugas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, AdminRepository, DataPetugasRepository, PengendaraRepository]),
    ConfigModule,
    EmailModule,
    JwtModule.register(jwtConfig),
  ],
  providers: [UsersService, DataPetugasService, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
