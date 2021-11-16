import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
// import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { emptyTypeAnnotation } from '@babel/types';
import { LoginRequestDto } from 'src/users/dto/login.request.dto';
import { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import * as moment from 'moment-timezone';
import { RefreshToken } from 'src/users/entities/user.refresh.token.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    // private readonly catsRepository: CatsRespository,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(RefreshToken)
    private refreshRepository: Repository<RefreshToken>,
  ) {
    this.refreshRepository = refreshRepository;
  }

  async findRefreshToken(refreshToken: string, role: number): Promise<string> {
    // 존재하는 리플래쉬 토큰인가 체크
    var token;
    try {
      token = await this.refreshRepository.findOne({
        where: { token: refreshToken },
      });
    } catch (e) {
      this.logger.error(`refresh 토큰 조회 실패: ${e}`);
    }

    if (!token) {
      // 리플래쉬 토큰이 없음
      throw new HttpException(
        '존재하지 않는 리플래쉬 토큰입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.debug(`리플래쉬 토큰 조회 성공 ${token}`);

    return token.token;
  }

  async checkRefreshTokenExpirseBeforeMonth(
    refreshTokenExp: number,
  ): Promise<boolean> {
    // 리플래쉬 토큰 만료가 한달 이내인지 체크
    var IsExpires = false;

    // 만료 날짜가 30일 뒤에 날짜보다 뒤인가?
    if (!moment(refreshTokenExp * 1000).isAfter(moment().add(30, 'days'))) {
      this.logger.debug('리플래쉬 토큰 재발급 해야함');
      IsExpires = true;
    }
    return IsExpires;
  }

  async saveRefreshToken(user: User, token: string): Promise<boolean> {
    // 리플래쉬 토큰 저장
    var result = true;

    const refreshTokenObject = new RefreshToken();
    refreshTokenObject.token = token;
    refreshTokenObject.uid = user.uid;

    try {
      this.logger.debug(`리플래쉬 토큰 저장`);
      await this.refreshRepository.save(refreshTokenObject);
    } catch (e) {
      this.logger.debug(`refresh token save error: ${e}`);
      result = false;
    }

    this.logger.debug(`save 후 결과 값: ${result}`);

    return result;
  }

  async makeRefreshToken(user: User, role: number): Promise<string> {
    // 리플래쉬 토큰 제작
    // 유효시간 3개월
    //rold 1: 관리자, 2: 트레이너, 3: 유저
    this.logger.debug(`makeRefreshToken: ${user} -${role}`);

    this.logger.debug(
      `리플래쉬 토큰 암호키  ${this.configService.get(
        'JWT_REFRESH_TOKEN_SECRET',
      )}`,
    );

    const payload = { uid: user.uid, role: role };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}d`,
    });

    return token;
  }

  async makeAccessToken(user: User, role: number): Promise<string> {
    // 엑세스 토큰 제작
    // 1주
    //role 1: 관리자, 2: 트레이너, 3: 유저
    this.logger.debug(`makeAccessToken: ${user} -${role}`);
    const payload = { uid: user.uid, role: role };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}d`,
    });

    return token;
  }
}
