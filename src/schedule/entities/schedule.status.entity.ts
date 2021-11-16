import { SettingBaseEntity } from "src/basic/entities/setting-base.entity";
import { Entity, OneToMany } from "typeorm";
import { Schedule } from "./schedule.entity";


/**
 * 예약 상태 Entity
 */
@Entity('SCHEDULE_STATUS')
export class ScheduleStatus extends SettingBaseEntity {

  @OneToMany(() => Schedule, schedule => schedule.schedule_status, {
    cascade: true,
  })
  schedule: Schedule
}