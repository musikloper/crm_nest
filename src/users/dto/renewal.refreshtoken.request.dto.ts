import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
export class RenwalRefreshTokenRequestDto {
  @ApiProperty({
    description: '액세스 토큰',
  })
  accessToken: string;

  @ApiProperty({
    description: '리플래쉬 토큰',
  })
  refreshToken: string;
}
