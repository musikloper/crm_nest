import { MyLogger } from "src/config/mylogger";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { CreateScheduleDto } from "./dto/create.schedule.dto";
import { ScheduleResponseDto, SchedulesResponseDto } from "./dto/response-schedule.dto";
import { Schedule } from "./entities/schedule.entity";


/**
 * 예약 Repository
 */
@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {

  private readonly logger = new MyLogger(ScheduleRepository.name)

  async getScheduleList(): Promise<SchedulesResponseDto> {

    try {
      const schedule = await getRepository(Schedule)
        .createQueryBuilder('schedule')
        .leftJoinAndSelect("schedule.customer_id", "customer")
        .leftJoinAndSelect("schedule.schedule_item", "scheduleItem")
        .leftJoinAndSelect("schedule.schedule_status", "scheduleStatus")
        .leftJoinAndSelect("schedule.schedule_section", "scheduleSection")
        .leftJoinAndSelect("schedule.manager_id", "manager")
        .getMany()
        this.logger.log(schedule)

        

        return { data: schedule, result: 1, resultMsg: '예약 전체 일정' }
    } catch (err) {
      this.logger.error(err)
      throw new Error('예약 전체 리스트를 불러오지 못 했습니다.')
    }
    
  }

  /**
   * 스케쥴 생성 
   * @param createScheuelDto 
   * @returns ScheduleResponseDto 생성한 스케쥴
   */
  async createSchedule(createScheuelDto: CreateScheduleDto): Promise<ScheduleResponseDto> {
    this.logger.log(createScheuelDto)

    const date = '2021-10-28'
    const status = 1
    const {
      start_time,
      end_time,
      memo,
      schedule_item,
      schedule_section,
      schedule_status,
      customer_id,
      manager_id } = createScheuelDto
    try {
      const insert = await getRepository(Schedule)
      .createQueryBuilder()
      .insert()
      .into(Schedule)
      .values({
        date: date,
        start_time: start_time,
        end_time: end_time,
        memo: memo,
        status: status,
        schedule_item: schedule_item,
        schedule_section: schedule_section,
        schedule_status: schedule_status,
        customer_id: customer_id,
        manager_id: manager_id,
      })
      .execute()
      this.logger.log(insert)

      const insertId = insert.raw.insertId

      const schedule = await getRepository(Schedule)
      .createQueryBuilder('schedule')
      .where("schedule.id = :id", { id: insertId })
      .leftJoinAndSelect("schedule.customer_id", "customer")
      .leftJoinAndSelect("schedule.schedule_item", "scheduleItem")
      .leftJoinAndSelect("schedule.schedule_status", "scheduleStatus")
      .leftJoinAndSelect("schedule.schedule_section", "scheduleSection")
      .leftJoinAndSelect("schedule.manager_id", "manager")
      .getOne()
      this.logger.log(schedule)

      return { data: schedule, result: 1, resultMsg: '예약 등록 성공' }
    } catch (err) {
      this.logger.error(err)
      throw new Error('예약 등록을 실패하였습니다.')
    }

  } 


  async getScheduleByParam(startDate: string, endDate: string): Promise<SchedulesResponseDto> {

    // start date, end date 받기

    try {
      const schedule = await getRepository(Schedule)
        .createQueryBuilder('schedule')
        .leftJoinAndSelect("schedule.customer_id", "customer")
        .leftJoinAndSelect("schedule.schedule_item", "scheduleItem")
        .leftJoinAndSelect("schedule.schedule_status", "scheduleStatus")
        .leftJoinAndSelect("schedule.schedule_section", "scheduleSection")
        .leftJoinAndSelect("schedule.manager_id", "manager")
        .where('schedule.start_time >= :startTime', { startTime: startDate })
        .andWhere('schedule.end_time <= :endTime', { endTime: endDate })
        .getMany()
        this.logger.log(schedule)

        

        return { data: schedule, result: 1, resultMsg: '예약 일정 검색 완료' }
    } catch (err) {
      this.logger.error(err)
      throw new Error('예약 리스트를 불러오지 못 했습니다.')
    }

  }



}