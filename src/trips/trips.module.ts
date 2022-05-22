import { TypeOrmModule } from '@nestjs/typeorm';
import { GeocodingModule } from './../geocoding/geocoding.module';
import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import Trip from './trip.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    GeocodingModule
  ],
  providers: [TripsService],
  controllers: [TripsController]
})
export class TripsModule { }
