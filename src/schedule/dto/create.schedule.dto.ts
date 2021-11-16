import { ApiProperty, PickType } from "@nestjs/swagger";
import { Schedule } from "../entities/schedule.entity";



export class CreateScheduleDto extends PickType(Schedule,
  ['date', 'start_time', 'end_time', 'memo', 'schedule_item', 'schedule_section', 'schedule_status', 'customer_id', 'manager_id']) {



}