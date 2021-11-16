import { SettingBaseEntity } from "src/basic/entities/setting-base.entity";
import { Entity, OneToMany } from "typeorm";
import { Schedule } from "./schedule.entity";

/**
 * 예약 구분 Entity
 */
@Entity('SCHEDULE_SECTIONS')
export class ScheduleSection extends SettingBaseEntity {

  
  @OneToMany(() => Schedule, schedule => schedule.schedule_section, {
    cascade: true,
  })
  schedule: Schedule
}