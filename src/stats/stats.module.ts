import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import Trip from 'src/trips/trip.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
  ],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule { }
