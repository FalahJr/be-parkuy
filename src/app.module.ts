import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './modules/main/main.modules';
import { SupportModule } from './modules/support/support.modules';
import { User } from './entities/user.entity';
import { Admin } from 'src/entities/admin.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { Petugas } from './entities/petugas.entity';
import { Pengendara } from './entities/pengendara.entity';
import { Location } from './entities/location.entity';
import AppConfig, { DbConfigMysql, DbConfigRedis } from './config/app.config';
import { ExistValidator } from './etc/validator/exist-validator';
import { Parking } from './entities/parking.entity';

const dbConfigMysql: DbConfigMysql = AppConfig().db.mysql;
const dbConfigRedis: DbConfigRedis = AppConfig().db.redis;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbConfigMysql.host,
      port: dbConfigMysql.port,
      username: dbConfigMysql.user,
      password: dbConfigMysql.password,
      database: dbConfigMysql.database,
      entities: [
        User,
        Location,
        Parking,
        Petugas,
        Pengendara,
        Admin,
        RefreshToken
      ],
      synchronize: true,
    }),
    MainModule,
    SupportModule
  ],
  controllers: [AppController],
  providers: [AppService, ExistValidator],
})
export class AppModule { }
