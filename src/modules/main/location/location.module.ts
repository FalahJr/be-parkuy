import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

import { LocationRepository } from './repository/location.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationRepository]),
  ],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule { }
