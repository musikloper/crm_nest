import { ApiProperty } from "@nestjs/swagger";
import { Manager } from "src/manager/entities/manager.entity";
import { Schedule } from "src/schedule/entities/schedule.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerJob } from "./customer.job.entity";
import { CustomerType } from "./customer.type.entity";
import { VisitPath } from "./visit.path.entity";

/**
 * 고객 Entity
 */
@Entity('CUSTOMER')
export class Customer {

  @ApiProperty({
    example: 1,
    description: '고객 일련 번호'
  })
  @PrimaryGeneratedColumn()
  customer_id: number;

  @ApiProperty({
    example: '20211020-001',
    description: '고객번호'
  })
  @Column('varchar', { length: 200 })
  unique_number: string;

  @ApiProperty({
    example: '홍길동',
    description: '고객이름'
  })
  @Column('varchar', { length: 200 })
  customer_name: string;

  @ApiProperty({
    example: '900105',
    description: '주민등록번호 앞자리'
  })
  @Column('varchar', { length: 6 })
  rrn_prefix: string;

  @ApiProperty({
    example: '1234567',
    description: '주민등록번호 뒷자리'
  })
  @Column('varchar', { length: 7 })
  rrn_suffix: string;

  @ApiProperty({
    example: '19900501',
    description: '생년월일'
  })
  @Column('datetime')
  birth_date: Date;

  @ApiProperty({
    example: 1,
    description: '양력/음력'
  })
  @Column('int', { default: 1 })
  luna_calendar: number;

  @ApiProperty({
    example: 'email@gmail.com',
    description: '고객 이메일'
  })
  @Column('varchar', { length: 200 })
  email: string;

  @ApiProperty({
    example: '12345',
    description: '우편번호'
  })
  @Column('varchar', { length: 10 })
  zipcode: string;

  @ApiProperty({
    example: '서울특별시 강남구',
    description: '도로명 주소'
  })
  @Column('varchar', { length: 200 })
  road_address: string;

  @ApiProperty({
    example: '서울특별시 강남구',
    description: '지번'
  })
  @Column('varchar', { length: 200 })
  old_address: string;

  @ApiProperty({
    example: '서울아파트 101동 101호',
    description: '상세주소'
  })
  @Column('varchar', { length: 200 })
  address_detail: string;

  @ApiProperty({
    example: '특이사항 메모',
    description: '특이사항'
  })
  @Column('varchar', { length: 2000 })
  customer_memo: string;

  @ApiProperty({
    example: 1,
    description: '이벤트 문자 수신'
  })
  @Column('int', { default: 2 })
  receive_event_sms: number;

  @ApiProperty({
    example: 1,
    description: '알림 문자 수신'
  })
  @Column('int', { default: 2 })
  receive_schedule_sms: number;

  @ApiProperty({
    example: 1,
    description: '성별'
  })
  @Column('int')
  gender: number;

  @ApiProperty({
    example: 1,
    description: '외국인 유무'
  })
  @Column('int', { default: 1 })
  foreigner:number;

  @ApiProperty({
    example: '2021-10-30',
    description: '고객 등록 날짜'
  })
  @CreateDateColumn()
  created_date: string;

  // 고객 등록 직원
  // @ApiProperty({
  //   example: '직원 홍길동',
  //   description: '고객 등록 직원 일련번호'
  // })
  // @Column('int')
  // staff_id: number;


  @ApiProperty({
    example: 1,
    description: '등록 고객 상태'
  })
  @Column('int', { default: 1 })
  customer_status: number;


  @ApiProperty({
    example: 1,
    description: '고객 분류'
  })
  @ManyToOne(() => CustomerType, customerType => customerType.customer, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({
    name: 'customer_type_id',
    referencedColumnName: 'id'
  })
  customerType: number;


  @ApiProperty({
    example: 1,
    description: '고객 직업'
  })
  @ManyToOne(() => CustomerJob, customerJob => customerJob.customer, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ 
    name: 'customer_job_id',
    referencedColumnName: 'id',
  })
  customerJob: number;

  @ApiProperty({
    example: 1,
    description: '유입 경로'
  })
  @ManyToOne(() => VisitPath, visitPath => visitPath.customer, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({
    name: 'visit_path_id',
    referencedColumnName: 'id',
  })
  visitPath: number;

  @ApiProperty({
    example: 1,
    description: '담당 직원'
  })
  @ManyToOne(() => Manager, manager => manager.customer, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({
    name: 'manager_id',
    referencedColumnName: 'id'
  })
  manager: number;


  @ApiProperty({
    example: 1,
    description: '소개자 '
  })
  @ManyToOne(() => Customer, introduce => introduce.customer_id, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: 'introduce_customer_id',
  })
  introduce_customer_id: number




  @ApiProperty({
    example: 1,
    description: '예약'
  })
  @OneToMany(() => Schedule, schedule => schedule.customer_id, {
    cascade: true,
  })
  schedule: Schedule

  

}