import { TripDto } from './dto/trip.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('trips')
export class TripsController {
  @Post()
  createTrip(@Body() trip: TripDto) {
    // TODO: Trigger the service handler
  }
}
