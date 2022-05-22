import { GeocodingService } from './geocoding.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GeocodingService],
  exports: [GeocodingService],
})
export class GeocodingModule { }
