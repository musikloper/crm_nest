import { ApiProperty } from "@nestjs/swagger";
import { Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * 기본 세팅 Entity
 */
export abstract class SettingBaseEntity {

  @ApiProperty({
    example: 1,
    description: '일련 번호',
    type: Number
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '내국인_VIP',
    description: '명칭',
    type: String
  })
  @Column('varchar', { length: 100 })
  name: string;

  @ApiProperty({
    example: 1,
    description: '사용 여부',
    type: Number
  })
  @Column('int')
  status: number;

  @ApiProperty({
    example: 1,
    description: '정렬 순서',
    type: Number
  })
  @Column('int')
  sort_order: number;




}

