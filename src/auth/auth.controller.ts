import {
  BadGatewayException,
  Body,
  Controller,
  HttpException,
  Logger,
  Post,
  SetMetadata,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { exception } from 'console';
import { LoginRequestDto } from 'src/users/dto/login.request.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { Roles } from './decorators/role.decorator';
import { RenwalRefreshTokenRequestDto } from 'src/users/dto/renewal.refreshtoken.request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({
    description: '유저 정보를 확인하고 access토큰,refresh 토큰을 발행한다.',
  })
  @Post('user/login')
  async login(@Body() data: LoginRequestDto) {
    this.logger.debug(`user/login: ${data.email}-${data.password}`);
    // 유저랑 데이터 베이스에서 아이디 조회

    const user = await this.usersService.findIdByEmail(data.email);
    this.logger.debug(`findIdByEmail: ${user}`);

    if (!user) {
      // 없으면 에러
      // Default data 넣어야 한다.
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (data.password !== user.password) {
      //비밀번호 불일치  비밀번호 디코깅 넣어야 한다.
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }
    // 리플래쉬 토큰 발급 후
    const refreshToken = await this.authService.makeRefreshToken(user, 3);
    this.logger.debug(`refreshToken: ${refreshToken}`);
    //데이터 베이스에 저장
    const result = await this.authService.saveRefreshToken(user, refreshToken);

    if (!result) {
      // 저장에 실패할 경우
      return '리플래쉬 토큰 저장 실패';
    }
    // 액세스 토큰 발급 후 리턴
    const accessToken = await this.authService.makeAccessToken(user, 3);
    this.logger.debug(`accessToken: ${accessToken}`);

    return { refreshToken: refreshToken, accessToken: accessToken };
  }
  /*







*/
  @ApiOperation({ summary: '토큰 갱신' })
  @ApiCreatedResponse({
    description:
      'access 토큰 만료시 refresh토큰으로 재발급(refresh토큰도 유효기간이 1달 미만이면 갱신한다. 둘다 만료시 로그인 화면으로)',
  })
  @Post('user/renewalToken')
  async renewalToken(@Body() data: RenwalRefreshTokenRequestDto) {
    this.logger.debug(
      `user/renewalToken: ${data.accessToken}-${data.refreshToken}`
    );

    // 존재하는 리플래쉬 토큰인지 확인
    const refreshToken = await this.authService.findRefreshToken(
      data.refreshToken,
      3
    );

    this.logger.debug(`리플래쉬 존재 여부 확인`);

    if (data.refreshToken !== refreshToken) {
      //존재하지 않는 리플래쉬 토큰 -- 재로그인 하라고 응답
      this.logger.error(`존재하지 않는 리플래쉬 토큰 입니다.`);
      throw new exception('존재하지 않는 리플래쉬 토큰 입니다.');
    }

    this.logger.debug(`리플래쉬 토큰 만료시간 확인 시작`);

    // 만료 검사
    var refreshTokenExpired;
    try {
      refreshTokenExpired = await this.jwtService.verifyAsync(
        data.refreshToken,
        {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        }
      );
    } catch (e) {
      this.logger.error(`error ${e}`);
      if (e instanceof TokenExpiredError) {
        this.logger.error(`토큰이 만료되었습니다.`);
        throw new UnprocessableEntityException('토큰이 만료되었습니다.');
      } else {
        this.logger.error(`형식에 맞지 않은 토큰입니다.`);
        throw new UnprocessableEntityException(
          '토큰의 형식이 옳바르지 않습니다.'
        );
      }
    }
    this.logger.debug(`정상적인 토큰`);

    //리플래쉬 토큰 유효기간이 한달 이내인지 확인하는 로직

    this.logger.debug(`refreshTokenExpired ${refreshTokenExpired.exp}`);

    const expired = await this.authService.checkRefreshTokenExpirseBeforeMonth(
      refreshTokenExpired.exp
    );
    const user = new User();
    user.uid = refreshTokenExpired.uid;
    if (expired) {
      //리플래쉬토큰 만료시
      this.logger.debug(`리플래쉬 토큰 재발급`);
      var newRefreshToken = await this.authService.makeRefreshToken(user, 3);
      this.logger.debug(`newRefreshToken: ${newRefreshToken}`);
      //데이터 베이스에 저장-- 여기가 지금 저장이 안된다.
      const result = await this.authService.saveRefreshToken(
        user,
        newRefreshToken
      );
      if (!result) {
        // 저장에 실패할 경우  다시 로그인
        return '리플래쉬 토큰 저장 실패';
      }
    }

    // 액세스 토큰 발급 후 리턴
    const accessToken = await this.authService.makeAccessToken(user, 3);
    this.logger.debug(`accessToken: ${accessToken}`);

    // 리플래쉬 토큰 만료시 두 토큰 다 보내고 아니면 하나만 보낸다.
    return expired
      ? { refreshToken: newRefreshToken, accessToken: accessToken }
      : { accessToken: accessToken };
  }
  /*








*/
  @ApiOperation({ summary: 'roles 가드 테스트' })
  @ApiCreatedResponse({
    description: 'roles 가드 테스트',
  })
  @Roles('user')
  @Post('test')
  async authtest() {
    return '테스트';
  }
}
