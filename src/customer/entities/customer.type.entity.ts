import { ApiProperty } from "@nestjs/swagger";
import { Entity, OneToMany, OneToOne, } from "typeorm";
import { SettingBaseEntity } from "../../basic/entities/setting-base.entity";
import { Customer } from "./customer.entity";


@Entity('CUSTOMER_TYPE')
export class CustomerType extends SettingBaseEntity {

  @ApiProperty({
    example: 1,
    description: ''
  })
  @OneToMany(() => Customer, customer => customer.customerType, {
    cascade: true,
  })
  customer: Customer
}