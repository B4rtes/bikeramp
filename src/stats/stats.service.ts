import { getWeekBoundaries, formatPrice, convertMeterToKm } from './../helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import Trip from 'src/trips/trip.entity';
import { Repository } from 'typeorm';

type WeekStats = {
  total_price: string;
  total_distance: string;
};

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>
  ) { }

  async getWeeklyStats() {
    const { startDate, endDate } = getWeekBoundaries();

    const stat: WeekStats = await this.tripRepo.createQueryBuilder('trip')
      .select(`SUM(trip.price)`, 'total_price')
      .addSelect(`SUM(trip.distance)`, 'total_distance')
      .where(`trip.date BETWEEN '${startDate.toDateString()}' AND '${endDate.toDateString()}'`)
      .getRawOne();

    return {
      total_price: formatPrice(stat.total_price),
      total_distance: convertMeterToKm(stat.total_distance)
    };
  }
}
