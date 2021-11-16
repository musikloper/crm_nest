import { Injectable, Logger } from '@nestjs/common';
import { MoreThan, ObjectType, Repository } from 'typeorm/index';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager } from 'typeorm';
import { RegisterUserRequestDto } from './dto/register.users.request.dto';
import { UserOutputDto } from './dto/users.output.dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user.profile.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    this.userRepository = userRepository;
  }
  async registerUser(data: RegisterUserRequestDto): Promise<UserOutputDto> {
    return await getManager()
      .transaction(async (transactionalEntityManager) => {
        // this.logger.debug(data);
        let user = await this.userRepository.findOne({
          where: { email: data.email, state: MoreThan(0) },
        });
        if (!user) {
          user = new User();
          user.email = data.email;
          user.name = data.name;
          user.password = data.password;
          user.state = 1;
          user.userProfile = new UserProfile();
          user.userProfile.address1 = data.address1;
          user.userProfile.address2 = data.address2;
          user.userProfile.birthDate = data.birthDate;
          user.userProfile.sex = data.sex;
          this.logger.debug(user);
          await transactionalEntityManager.save(user);
          // const userProfile = new UserProfile();
          // userProfile.user = user;
          // userProfile.address1 = data.address1;
          // userProfile.address2 = data.address2;
          // userProfile.birthDate = data.birthDate;
          // userProfile.sex = data.sex;
          // await transactionalEntityManager.save(userProfile);
          return { data: user, result: 1, resultMsg: 'success' };
        } else {
          return { data: user, result: 0, resultMsg: 'fail' };
        }
      })
      .catch((err) => {
        throw err;
      });
  }
  /**
   * User 리스트 조회
   */
  async getAll({ page = 0, count = 20 }): Promise<User[]> {
    this.logger.debug(`getAll: ${page}, ${count}`);
    return await this.userRepository.find({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          profile: 'user.userProfile',
          token: 'user.pushToken',
        },
      },
      skip: page * count,
      take: count,
    });
  }
  /**
   * 특정 유저 조회
   * @param uid
   */
  async findOne(uid: number): Promise<User> {
    this.logger.debug(`findOne: ${uid}`);
    return await this.userRepository.findOne({ where: { uid: uid } });
  }

  /**
   * 이메일로 유저 데이터 조회
   * @param email
   */
  async findIdByEmail(email: string): Promise<User> {
    this.logger.debug(`findIdByEmail-email: ${email}`);

    var user;
    try {
      user = await this.userRepository.findOne({ where: { email: email } });
    } catch (e) {
      this.logger.debug(`error: ${e}`);
    }

    this.logger.debug(user);

    return user;
  }
}
