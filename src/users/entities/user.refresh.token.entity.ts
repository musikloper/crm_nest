import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@Entity('TB_REFRESHTOKEN')
export class RefreshToken {
  @ApiProperty({
    example: 1,
    description: '유저 리플래쉬토큰 인식번호',
  })
  @PrimaryGeneratedColumn()
  uid: number;

  @ApiProperty({
    example: 'xxxxxxxxxxxxxx',
    description: '토큰',
  })
  @Column('varchar', { length: 300 })
  token: string;

  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: '등록일',
  })
  @CreateDateColumn()
  regDate: Date;

  @ManyToOne((type) => User)
  @JoinColumn([{ referencedColumnName: 'uid' }])
  user: User;
}
