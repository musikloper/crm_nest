import {
  Controller,
  HttpStatus,
  Post,
  Get,
  Body,
  Query,
  Param,
  Res,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserOutputDto, UsersOutputDto } from './dto/users.output.dto';
import { RegisterUserRequestDto } from './dto/register.users.request.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/role.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  // 이 로거는 왜 쓴건가요???
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  @Post('register')
  async registerUser(
    @Body() data: RegisterUserRequestDto,
    @Res() res: Response,
  ) {
    console.log('test controller');
    console.log(data);
    const user = await this.userService.registerUser(data);
    return user;
    // this.userService.registerUser(data);
    // let res = new DefaltResponseDto();
    // res.statusCode = '200';
    // res.statusMsg = 'test';
    // return res;
  }

  @ApiOperation({ summary: '회원리스트' })
  @ApiCreatedResponse({
    description: '모든 회원정보를 확인한다',
    type: UsersOutputDto,
  })
  @Roles('admin')
  @Get('list')
  async getAll(@Query() query: Object): Promise<User[]> {
    const userList = await this.userService.getAll(query);
    // return Object.assign({
    //   data: userList,
    //   statusCode: 200,
    //   statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    // });

    return userList;
  }

  @ApiOperation({ summary: '회원정보' })
  @ApiCreatedResponse({
    description: '특정 회원정보를 확인한다',
    type: UserOutputDto,
  })
  @Get('register')
  async registerGet(
    @Query() data: RegisterUserRequestDto,
    @Res() res: Response,
  ) {
    // this.logger.debug(data);
    const foundUser = await this.userService.registerUser(data);
    if (foundUser.result == 0) {
      res.status(HttpStatus.CONFLICT).send(foundUser);
    } else {
      res.status(HttpStatus.OK).send(foundUser);
    }
  }

  @ApiOperation({ summary: '회원정보' })
  @ApiCreatedResponse({
    description: '특정 회원정보를 확인한다',
    type: UserOutputDto,
  })
  @Get('find/:userId')
  async findOne(@Param('userId') uid: number): Promise<User> {
    const foundUser = await this.userService.findOne(uid);
    return Object.assign({
      data: foundUser,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @ApiOperation({ summary: '유저가 받은 알림 정보를 조회한다.' })
  @ApiCreatedResponse({
    description: '유저가 받은 알림 정보',
    type: UserOutputDto,
  })
  @Get(':uid/alarm')
  async findUserAlarm(@Param('userId') uid: number): Promise<User> {
    const foundUser = await this.userService.findOne(uid);
    return Object.assign({
      data: foundUser,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
}
