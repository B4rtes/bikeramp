import { GeocodingService } from './../geocoding/geocoding.service';
import { Inject, Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripDto } from './dto/trip.dto';
import Trip from './trip.entity';

@Injectable()
export class TripsService {

  private readonly logger = new Logger(TripsService.name);

  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>
  ) { }

  @Inject(GeocodingService)
  private readonly geocodingService: GeocodingService;

  async createTrip(trip: TripDto) {
    const { start_address, destination_address, date, price } = trip;

    try {
      const distance = await this.geocodingService.getDistance(start_address, destination_address);
      this.logger.log(`Distance value: ${distance}`);

      return this.tripRepo.save({
        start_address,
        destination_address,
        date,
        price,
        distance
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }


  }
}
