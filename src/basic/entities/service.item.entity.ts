import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/basic/entities/category.entity";
import { SettingBaseEntity } from "src/basic/entities/setting-base.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('SERVICE_ITEM')
export class TextTemplate extends SettingBaseEntity {

  @ApiProperty({
    example: 1,
    description: '서비스유형 경로'
  })
  @Column('int')
  path: number;

  @ApiProperty({
    example: 10000,
    description: '서비스유형 정가'
  })
  @Column('int')
  price: number;

  @ApiProperty({
    example: 1000,
    description: '서비스유형 할인'
  })
  @Column('int')
  discount: number;

  @ApiProperty({
    example: 1000,
    description: '서비스유형 과세'
  })
  @Column('int')
  texable: number;


  @ApiProperty({
    example: 1,
    description: '카테고리'
  })
  @OneToOne(() => Category)
  @JoinColumn()
  category: Category
}