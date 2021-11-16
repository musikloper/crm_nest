import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleItemsRepository } from './schedule.items.repository';
import { ScheduleSectionRepository } from './schedule.sections.repository';
import { ScheduleStatusRepository } from './schedule.status.repository';
import { ScheduleRepository } from './schedule.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduleItemsRepository,
      ScheduleSectionRepository,
      ScheduleStatusRepository,
      ScheduleRepository,
    ])
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
