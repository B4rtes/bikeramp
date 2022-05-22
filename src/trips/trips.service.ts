import { GeocodingService } from './../geocoding/geocoding.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripDto } from './dto/trip.dto';
import Trip from './trip.entity';

@Injectable()
export class TripsService {

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

      return this.tripRepo.save({
        start_address,
        destination_address,
        date,
        price,
        distance
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.log(error.stack);
        return;
      }

      console.log(error);
    }


  }
}
