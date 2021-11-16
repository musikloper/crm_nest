import { ApiProperty } from "@nestjs/swagger";
import { VisitPath } from "src/customer/entities/visit.path.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('CATEGORY')
export class Category {

  @ApiProperty({
    example: 1,
    description: '카테고리 일련 번호'
  })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({
    example: '카테고리 이름',
    description: '카테고리 명칭'
  })
  @Column('varchar', { length: 100 })
  name: string;
  
  @ApiProperty({
    example: 1,
    description: '카테고리 상태'
  })
  @Column('int')
  status: number;
  
  @ApiProperty({
    example: 1,
    description: '카테고리 삭제가능'
  })
  @Column('int')
  deletable: number;
  
  
  @ApiProperty({
    example: '카테고리 사용된 경로',
    description: '카테고리 경로'
  })
  @Column('varchar', { length: 100 })
  path: string;


  // @OneToMany(() => VisitPath, visitpath => visitpath.category, {
  //   cascade: true,
  // })
  // visit_path: Category[]
}