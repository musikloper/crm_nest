import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/basic/entities/category.entity";
import { SettingBaseEntity } from "src/basic/entities/setting-base.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('TEXT_TEMPLATE')
export class TextTemplate extends SettingBaseEntity {

  @ApiProperty({
    example: '상용구 사용된 경로',
    description: '상용구 경로'
  })
  @Column('varchar', { length: 100 })
  path: string;


  @ApiProperty({
    example: 1,
    description: '카테고리'
  })
  @OneToOne(() => Category)
  @JoinColumn()
  category: Category

}