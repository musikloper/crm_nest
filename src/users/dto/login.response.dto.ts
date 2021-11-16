import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
// import { OmitType } from '@nestjs/mapped-types';
import { DefaultResponseDto } from '../../config/default.res.dto';
import { Entity } from 'typeorm';

export class LoginRequestDto extends DefaultResponseDto {
  @ApiProperty({
    description: '리플래쉬 토큰',
  })
  refreshToken: string;

  @ApiProperty({
    description: '액세스 토큰',
  })
  AccessToken: string;
}
