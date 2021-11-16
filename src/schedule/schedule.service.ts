import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { start } from 'repl';
import { CreateScheduleDto } from './dto/create.schedule.dto';
import { CreateScheduleItemDto } from './dto/create.schedule.setting.dto';
import { ScheduleResponseDto, SchedulesResponseDto } from './dto/response-schedule.dto';
import { ScheduleItemsRepository } from './schedule.items.repository';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleSectionRepository } from './schedule.sections.repository';
import { ScheduleStatusRepository } from './schedule.status.repository';

@Injectable()
export class ScheduleService {

  constructor(
    @InjectRepository(ScheduleRepository)
    private scheduleRepository: ScheduleRepository,

    @InjectRepository(ScheduleItemsRepository)
    private scheduleItemsRepository: ScheduleItemsRepository,
    
    @InjectRepository(ScheduleSectionRepository)
    private scheduleSectionRepository: ScheduleSectionRepository,

    @InjectRepository(ScheduleStatusRepository)
    private scheduleStatusRepository: ScheduleStatusRepository
  ){}

  /**
   * 예약 관련 설정 전체 리스트
   * @param {string} type 예약 항목 or 예약 구분
   * @example '예약 항목'
   * @returns {Object} responseDto
   */
  async getItemList(type: string): Promise<Object> {

    if (type === '예약 항목') {
      return await this.scheduleItemsRepository.getItemList()
    } else if (type === '예약 구분') {
      return await this.scheduleSectionRepository.getItemList()
    } else if (type === '예약 상태') {
      return await this.scheduleStatusRepository.getItemList()
    } 
  }


  async createSettingItem(scheduleSettingCreateDto: CreateScheduleItemDto) {
    const { type, name, status } = scheduleSettingCreateDto

    if (type === '예약 항목') {
      return await this.scheduleItemsRepository.createScheduleItem(name, status)
    } else if (type === '예약 구분') {
      return await this.scheduleSectionRepository.createScheduleItem(name, status)
    } else if (type === '예약 상태') {
      return await this.scheduleStatusRepository.createScheduleItem(name, status)
    }
  }

  async createSchedule(createScheduleDto: CreateScheduleDto): Promise<ScheduleResponseDto> {
    return await this.scheduleRepository.createSchedule(createScheduleDto)
  }

  async getScheduleList(): Promise<SchedulesResponseDto> {
    return await this.scheduleRepository.getScheduleList()
  }

  async getScheduleByParam(startDate, endDate): Promise<SchedulesResponseDto> {
    return await this.scheduleRepository.getScheduleByParam(startDate, endDate)
  }
}
