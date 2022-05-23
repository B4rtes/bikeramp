import { StatsService } from './stats.service';
import { Controller, Get } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @Get('weekly')
  async getWeeklyStats() {
    return this.statsService.getWeeklyStats();
  }

  @Get('monthly')
  async getMonthlyStats() {
    return this.statsService.getMonthlyStats();
  }
}
