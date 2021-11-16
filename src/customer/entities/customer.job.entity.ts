import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SettingBaseEntity } from "../../basic/entities/setting-base.entity";
import { Customer } from "./customer.entity";

// 고객 직업
@Entity('CUSTOMER_JOB')
export class CustomerJob extends SettingBaseEntity {


  @OneToMany(() => Customer, customer => customer.customerJob, {
    cascade: true,
  })
  customer: Customer
}