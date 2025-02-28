import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PengendaraController } from './pengendara.controller';
import { PengendaraService } from './pengendara.service';
import { PengendaraRepository } from './repository/pengendara.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PengendaraRepository]),
  ],
  providers: [PengendaraService],
  controllers: [PengendaraController],
  exports: [PengendaraService],
})
export class PengendaraModule { }
