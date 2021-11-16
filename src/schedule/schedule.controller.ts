import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyLogger } from 'src/config/mylogger';
import { CreateScheduleDto } from './dto/create.schedule.dto';
import { SchedulesResponseDto } from './dto/response-schedule.dto';
import { ScheduleService } from './schedule.service';

@ApiTags('Schedule')
@Controller('/schedule')
export class ScheduleController {

  private readonly logger = new MyLogger(ScheduleController.name)

  constructor(
    private readonly scheduleService: ScheduleService
  ) {}


  @ApiOperation({ summary: '예약 설정 리스트'})
  @ApiCreatedResponse({ description: '예약 설정 전체 리스트 출력'})
  @Get('/scheduleSettingList')
  async scheduleSettingList(@Query('type') type: string) {
    this.logger.log(`Query('type') : ${type}`)
    return await this.scheduleService.getItemList(type)
  }

  @ApiOperation({ summary: '예약 설정 추가'})
  @ApiCreatedResponse({ description: '예약 설정 추가'})
  @Post('/scheduleSetting')
  async insertScheduleSettingList(@Body() data) {
    this.logger.log('예약 설정')
    this.logger.log(data)
    return await this.scheduleService.createSettingItem(data)
  }


  @ApiOperation({ summary: '예약 추가' })
  @ApiCreatedResponse({ description: '예약 추가' })
  @Post()
  async insertSchedule(@Body() data: CreateScheduleDto) {
    this.logger.log(data)
    const c = await this.scheduleService.createSchedule(data)
    this.logger.log(c)
  }

  @ApiOperation({ summary: '예약 전체 리스트 '})
  @ApiCreatedResponse({ description: '예약 전체 리스트 불러오기' })
  @Get()
  async findAll(): Promise<SchedulesResponseDto> {
    return await this.scheduleService.getScheduleList()
  }
  // Promise<SchedulesResponseDto>
  @ApiOperation({ summary: '예약 검색 '})
  @ApiCreatedResponse({ description: '조건으로 예약 검색하기 '})
  @Get('/scheduleByDate')
  async getScheduleByDate(@Query() data)  {
    this.logger.log(data)
    return await this.scheduleService.getScheduleByParam(data.startDate, data.endDate)
  }
}
