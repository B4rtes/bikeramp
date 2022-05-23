import { getWeekBoundaries, formatPrice, convertMeterToKm, formatDate } from './../helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import Trip from 'src/trips/trip.entity';
import { Repository } from 'typeorm';

type WeekStats = {
  total_price: string;
  total_distance: string;
};

type MonthStats = {
  date: string;
  total_distance: string;
  avg_ride: string;
  avg_price: string;
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

  async getMonthlyStats() {
    const stat: MonthStats[] = await this.tripRepo.createQueryBuilder('trip')
      .select('date')
      .addSelect(`ROUND(AVG(trip.price), 2)`, 'avg_price')
      .addSelect(`AVG(trip.distance)`, 'avg_ride')
      .addSelect(`SUM(trip.distance)`, 'total_distance')
      .where(`extract(MONTH from date) = extract(MONTH from now())`) // Getting for the current month
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    return stat.map(statData => ({
      day: formatDate(statData.date),
      total_distance: convertMeterToKm(statData.total_distance),
      avg_ride: convertMeterToKm(statData.avg_ride),
      avg_price: formatPrice(statData.avg_price),
    }));

  }
}
