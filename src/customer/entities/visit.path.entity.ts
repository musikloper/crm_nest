import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/basic/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SettingBaseEntity } from "../../basic/entities/setting-base.entity";
import { Customer } from "./customer.entity";


@Entity('VISIT_PATH')
export class VisitPath extends SettingBaseEntity {


  @ApiProperty({
    example: 1,
    description: ''
  })
  @OneToMany(() => Customer, customer => customer.visitPath, {
    cascade: true,
  })
  customer: Customer
  
  // @ApiProperty({
  //   example: 1,
  //   description: '유입경로 삭제가능'
  // })
  // @Column('int')
  // deletable: number;


  // 나중에 카테고리 추가하기
  // @ApiProperty({
  //   example: 1,
  //   description: '카테고리'
  // })
  // @ManyToOne(() => Category, category => category.visit_path, {
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE'
  // })
  // @JoinColumn({ name: 'category_id', referencedColumnName: "id" })
  // category: Category

}