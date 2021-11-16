import { ApiProperty } from "@nestjs/swagger";


export class FindCustomerDto {

  @ApiProperty({
    description: '고객 번호',
    example: '20210101-001'
  })
  unique_number: string

  @ApiProperty({
    description: '고객 이름',
    example: '홍길동'
  })
  customer_name: string

  @ApiProperty({
    description: '주민 번호 앞자리',
    example: '800101'
  })
  rrn_prefix: string

  @ApiProperty({
    description: '고객 생일',
    example: '1990-01-01'
  })
  birth_date: string

  @ApiProperty({
    description: '고객 이메일',
    example: 'testemail@email.com'
  })
  email: string
}