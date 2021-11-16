import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "src/customer/entities/customer.entity";
import { Schedule } from "src/schedule/entities/schedule.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('MANAGER')
export class Manager {

  @ApiProperty({
    example: 1,
    description: '직원 일련 번호'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '홍길동',
    description: '직원 이름'
  })
  @Column('varchar', { length: 10 })
  name: string;

  @ApiProperty({
    example: 'SP',
    description: '직원 타입'
  })
  @Column('varchar', { length: 10 })
  type: string;

  @ApiProperty({
    example: 1,
    description: '직원 상태'
  })
  @Column('int')
  status: number;

  @OneToMany(() => Schedule, schedule => schedule.manager_id, {
    cascade: true,
  })
  schedule: Schedule

  @ApiProperty({
    example: 1,
    description: ''
  })
  @OneToMany(() => Customer, customer => customer.manager, {
    cascade: true,
  })
  customer: Customer
}
