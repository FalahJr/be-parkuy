import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { LocationModule } from "./location/location.module";
import { DataPetugasModule } from "./petugas/data-petugas.module";
import { UsersModule } from "./users/users.module";
import { AdminModule } from './admin/admin.module';
import { ParkingModule } from './parking/parking.module';
import { PengendaraModule } from "./pengendara/pengendara.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DataPetugasModule,
    PengendaraModule,
    LocationModule,
    ParkingModule,
    AdminModule
  ]
})

export class MainModule { }