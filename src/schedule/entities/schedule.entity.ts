import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "src/customer/entities/customer.entity";
import { Manager } from "src/manager/entities/manager.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleItem } from "./schedule.items.entity";
import { ScheduleSection } from "./schedule.sections.entity";
import { ScheduleStatus } from "./schedule.status.entity";


/**
 * 예약 Entity
 */
@Entity('SCHEDULE')
export class Schedule {

  @ApiProperty({
    example: 1,
    description: '예약 일련 번호'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2021-10-01',
    description: '예약 날짜 YYYY-MM-DD'
  })
  @Column('datetime')
  date: string;

  @ApiProperty({
    example: '13:30',
    description: '예약 시작 시간 HH:MM'
  })
  @Column('datetime')
  start_time: string;

  @ApiProperty({
    example: '14:00',
    description: '예약 종료 시간 HH:MM'
  })
  @Column('datetime')
  end_time: string;

  @ApiProperty({
    example: 1,
    description: '예약 상태'
  })
  @Column('int')
  status: number;

  @ApiProperty({
    example: '예약 메모',
    description: '예약 메모 작성'
  })
  @Column('varchar', { length: 2000 })
  memo: string;

  @ApiProperty({
    example: 1,
    description: '에약 항목 id'
  })
  @ManyToOne(() => ScheduleItem, scheduleItem => scheduleItem.schedule, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  } )
  @JoinColumn({
    name: 'schedule_item_id',
    referencedColumnName: 'id'
  })
  schedule_item: number

  @ApiProperty({
    example: 1,
    description: '예약 상태 id'
  })
  @ManyToOne(() => ScheduleStatus, scheduleStatus => scheduleStatus.schedule, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  } )
  @JoinColumn({
    name: 'schedule_status_id',
    referencedColumnName: 'id'
  })
  schedule_status: number

  @ApiProperty({
    example: 1,
    description: '예약 구분 id'
  })
  @ManyToOne(() => ScheduleSection, scheduleSection => scheduleSection.schedule, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  } )
  @JoinColumn({
    name: 'schedule_section_id',
    referencedColumnName: 'id'
  })
  schedule_section: number

  @ApiProperty({
    example: 1,
    description: '담당 직원'
  })
  @ManyToOne(() => Manager, manager => manager.schedule, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  } )
  @JoinColumn({
    name: 'manager_id',
    referencedColumnName: 'id'
  })
  manager_id: number

  @ApiProperty({
    example: 1,
    description: '고객 id',
    // type: () => Customer
  })
  @ManyToOne(() => Customer, customer => customer.schedule, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  } )
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'customer_id'
  })
  customer_id: number


}