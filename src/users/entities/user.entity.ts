import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { UserProfile } from './user.profile.entity';

@Entity('TB_USER')
export class User {
  @ApiProperty({
    example: 1,
    description: '유저인식번호',
  })
  @PrimaryGeneratedColumn()
  uid: number;

  @ApiProperty({
    example: 'example@email.com',
    description: '이메일',
  })
  @Index()
  @Column('varchar', { length: 100 })
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  @Column('varchar', { length: 100 })
  name: string;

  @ApiProperty({
    example: '******',
    description: '비밀번호',
  })
  @Column('varchar', { length: 100 })
  password: string;

  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: '수정일',
  })
  @UpdateDateColumn()
  updateDate: Date;

  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: '가입일',
  })
  @CreateDateColumn()
  regDate: Date;

  @ApiProperty({
    example: 1,
    description: '상태',
  })
  @Column({ type: 'tinyint', default: 1 })
  state: number;

  @ApiProperty({
    description: '유저 프로필',
    oneOf: [{ $ref: getSchemaPath(UserProfile) }],
  })
  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, {
    cascade: true,
  }) // cascade 설정해야 한꺼번에 인서트 가능함
  userProfile: UserProfile;

  // @ApiProperty({
  //   description: '유저 푸시토큰',
  //   items: {
  //     $ref: getSchemaPath(UserPushToken),
  //   },
  // })
  // @OneToMany(() => UserPushToken, (pushToken) => pushToken.user, {
  //   cascade: true,
  // })
  // pushToken: UserPushToken;

  // @ApiProperty({
  //   description: '유저 리플래쉬토큰',
  //   items: {
  //     $ref: getSchemaPath(RefreshPushToken),
  //   },
  // })
  // @OneToMany(() => RefreshPushToken, (pushToken) => pushToken.user, {
  //   cascade: true,
  // })
  // refreshToken: RefreshPushToken;
}
