import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('TB_USERPROFILES')
export class UserProfile {
  @ApiProperty({
    example: 1,
    description: '유저프로필 인식번호',
  })
  @PrimaryGeneratedColumn()
  uid: number;

  @ApiProperty({
    example: '서울',
    description: '주소1',
  })
  @Column('varchar', { length: 300 })
  address1: string;

  @ApiProperty({
    example: '아파트',
    description: '주소2',
  })
  @Column('varchar', { length: 300 })
  address2: string;

  @ApiProperty({
    example: 1,
    description: '성별. 0: 미지정, 1: 남, 2: 여',
  })
  @Column({ type: 'tinyint', default: 0 })
  sex: number;

  @ApiProperty({
    example: '2021-01-01',
    description: '생년월일',
  })
  @Column('varchar', { length: 100 })
  birthDate: string;

  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: '수정일',
  })
  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(() => User, (user) => user.userProfile)
  @JoinColumn()
  user: User;
}
