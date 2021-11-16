import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

/**
 * 고객 설정 Dto - 카테고리 있음
 */
export class CustomerSettingCreateDto {

  @ApiProperty({
    description: '고객 설정 타입',
    example: '고객 직업 설정'
  })
  @IsString()
  type: string

  @ApiProperty({
    description: '고객 설정 명칭',
    example: '회사원, 내국인_VIP, 페이스북'
  })
  @IsString()
  name: string

  @ApiProperty({
    description: '고객 설정 상태 1: 사용 2: 삭제',
    example: 1
  })
  @IsNumber()
  status: number

  @ApiProperty({
    description: '카테고리',
    example: '홈페이지'
  })
  category: number
}