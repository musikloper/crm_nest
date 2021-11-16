import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
// import { OmitType } from '@nestjs/mapped-types';
import { DefaultResponseDto } from '../../config/default.res.dto';
import { Entity } from 'typeorm';
import { User } from '../entities/user.entity';

// export class UserResponseDto extends OmitType(User, ['id']) {}

export class UsersOutputDto extends DefaultResponseDto {
  @ApiProperty({
    description: '유저 정보 리스트',
    type: 'array',
    items: {
      $ref: getSchemaPath(User),
    },
  })
  data?: [User];
}

export class UserOutputDto extends DefaultResponseDto {
  @ApiProperty({
    description: '유저 정보',
  })
  data?: User;
}
