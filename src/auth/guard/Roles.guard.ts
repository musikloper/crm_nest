import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnprocessableEntityException,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { runInThisContext } from 'vm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('JwtService') private jwtService: JwtService,
    @Inject('ConfigService') private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    //TODO: 테스트 때문에 헤더에 담았지만 토큰에 답을 예정
    // 근데 매번 토큰 디코딩을 해서 보내면 자원을 많이 먹지 않을까?
    const token = request.headers.token;
    this.logger.debug(`token-${token}`);
    this.logger.debug(
      `JWT_REFRESH_TOKEN_SECRET-${this.configService.get(
        'JWT_REFRESH_TOKEN_SECRET',
      )}`,
    );

    // 디코딩한 토큰 정보
    var tokeninfo;

    if (token) {
      try {
        tokeninfo = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        });
      } catch (e) {
        this.logger.error(`error ${e}`);
        if (e instanceof TokenExpiredError) {
          this.logger.error(`토큰이 만료되었습니다.`);
          throw new UnprocessableEntityException('토큰이 만료되었습니다.');
        } else {
          this.logger.error(`형식에 맞지 않은 토큰입니다.`);
          throw new UnprocessableEntityException(
            '토큰의 형식이 옳바르지 않습니다.',
          );
        }
      }
    } else {
      throw new HttpException('토큰이 존재하지 않습니다.', 500);
    }

    const role = tokeninfo.role;
    //role 1: 관리자, 2: 트레이너, 3: 유저
    var pass = false;

    this.logger.debug(`roles-${roles}`);
    this.logger.debug(`role-${role}`);

    if (role == 1 && roles.includes('admin')) {
      this.logger.debug(`관리자가 접근`);
      pass = true;
    } else if (role == 2 && roles.includes('trainner')) {
      this.logger.debug(`트레이너가 접근`);
      pass = true;
    } else if (role == 3 && roles.includes('user')) {
      this.logger.debug(`유저기 접근`);
      pass = true;
    } else {
      this.logger.debug(`이상한 사용자가 접근`);
      pass = false;
    }

    this.logger.debug(`pass-${pass}`);

    return pass;
  }
}
