import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponseDto {
  @ApiProperty({
    description: '결과 코드',
  })
  result: number;

  @ApiProperty({
    description: '결과 메세지',
  })
  resultMsg: string;
}
