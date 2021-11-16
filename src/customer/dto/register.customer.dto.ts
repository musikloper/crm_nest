import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";


export class RegisterCustomerDto {
  @ApiProperty({
    description: '고객 번호',
    example: '20210101-001'
  })
  @IsString()
  unique_number: string

  @ApiProperty({
    description: '고객 이름',
    example: '홍길동'
  })
  @IsString()
  customer_name: string

  @ApiProperty({
    description: '주민 번호 앞자리',
    example: '800101'
  })
  @IsString()
  rrn_prefix: string

  @ApiProperty({
    description: '주민 번호 뒷자리',
    example: '1234567'
  })
  @IsString()
  rrn_suffix: string

  @ApiProperty({
    description: '고객 생일',
    example: '1990-01-01'
  })
  @IsString()
  birth_date: string

  @ApiProperty({
    description: '양력/음력',
    example: 1
  })
  @IsNumber()
  luna_calendar: number

  @ApiProperty({
    description: '고객 이메일',
    example: 'testemail@email.com'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: '우편번호',
    example: '12345'
  })
  @IsString()
  zipcode: string

  @ApiProperty({
    description: '도로명 주소',
    example: '서울특별시 강남구 '
  })
  @IsString()
  road_address: string

  @ApiProperty({
    description: '지번',
    example: '서울특별시 강남구'
  })
  @IsString()
  old_address: string

  @ApiProperty({
    description: '상세주소',
    example: '아파트 101동'
  })
  @IsString()
  address_detail: string

  @ApiProperty({
    description: '메모',
    example: '메모 내용'
  })
  @IsString()
  customer_memo: string

  
  @ApiProperty({
    description: '이벤트 문자 수신',
    example: 1
  })
  @IsNumber()
  receive_event_sms: number;

  
  @ApiProperty({
    description: '알림 문자 수신',
    example: 1
  })
  @IsNumber()
  receive_schedule_sms: number;

  
  @ApiProperty({
    description: '성별',
    example: 1
  })
  @IsNumber()
  gender: number;

  @ApiProperty({
    description: '외국인 유무',
    example: 1
  })
  @IsNumber()
  foreigner: number;

  // @ApiProperty({
  //   description: '고객 등록 날짜',
  //   example: '2021-10-15'
  // })
  // created_date: string

  @ApiProperty({
    example: 1,
    description: '등록 고객 상태'
  })
  @IsNumber()
  customer_status: number;

  @ApiProperty({
    example: 1,
    description: '고객 분류 일련번호'
  })
  customer_type: number;

  @ApiProperty({
    example: 1,
    description: '고객 직업 일련번호'
  })
  customer_job_id: number;

  @ApiProperty({
    example: 1,
    description: '유입 경로 일련번호'
  })
  visit_path_id: number;

  @ApiProperty({
    example: 1,
    description: '담당 직원 일련번호'
  })
  manager_id: number;

  @ApiProperty({
    example: 1,
    description: '소개자 '
  })
  introduce_customer_id: number;
}