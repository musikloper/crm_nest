import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequestDto {
  @ApiProperty({
    example: 'example@google.com',
    description: '이메일',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: '비밀번호',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: '서울',
    description: '주소1',
  })
  address1: string;

  @ApiProperty({
    example: '아파트',
    description: '주소2',
  })
  address2: string;

  @ApiProperty({
    example: 1,
    description: '성별. 0: 미지정, 1: 남, 2: 여',
  })
  sex: number;

  @ApiProperty({
    example: '2021-01-01',
    description: '생년월일',
  })
  birthDate: string;
}
