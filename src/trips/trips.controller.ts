import { TripDto } from './dto/trip.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripService: TripsService) { }

  @Post()
  createTrip(@Body() trip: TripDto) {
    return this.tripService.createTrip(trip);
  }
}
