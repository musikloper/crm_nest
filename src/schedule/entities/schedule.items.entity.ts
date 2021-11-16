import { SettingBaseEntity } from "src/basic/entities/setting-base.entity";
import { Entity, OneToMany } from "typeorm";
import { Schedule } from "./schedule.entity";


/**
 * 예약 항목 Entity
 */
@Entity('SCHEDULE_ITEMS')
export class ScheduleItem extends SettingBaseEntity {


  @OneToMany(() => Schedule, schedule => schedule.schedule_item, {
    cascade: true,
  })
  schedule: Schedule
}