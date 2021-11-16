import { MyLogger } from "src/config/mylogger";
import { EntityRepository, Repository } from "typeorm";
import { ScheduleStatusListResponseDto, ScheduleStatusResponseDto } from "./dto/response.schedule.status.dto";
import { ScheduleStatus } from "./entities/schedule.status.entity";




/**
 * 예약 상태 Repository
 */
@EntityRepository(ScheduleStatus)
export class ScheduleStatusRepository extends Repository<ScheduleStatus> {

  private readonly logger = new MyLogger(ScheduleStatusRepository.name)

  /**
   * 예약 상태 전체 리스트
   * @returns ScheduleStatusListResponseDto 
   */
  async getItemList(): Promise<ScheduleStatusListResponseDto> {
    let itemList: ScheduleStatus[]

    try {
      itemList = await this.find({
        order: {
          sort_order: "ASC"
        },
      })
      this.logger.log(itemList)

      if (itemList.length !== 0) {
        return { data: itemList, result: 1, resultMsg: '예약 상태 전체 리스트'}
      } else {
        return { data: itemList, result: 2, resultMsg: '예약 상태 전체 리스트가 없습니다.'}
      }
    } catch (err) {
      this.logger.error(err)
      throw new Error('예약 상태 전체 리스트를 가져오지 못 했습니다.')
    }
  }

  /**
   * 예약 상태 추가
   * @params name 예약 상태 명칭
   * @params status 예약 상태 사용 여부
   * @returns ScheduleSectionResponseDto
   */
   async createScheduleItem(name: string, status: number): Promise<ScheduleStatusResponseDto> {
    let item: ScheduleStatus

    try {
      item = await this.findOne({
        where: {
          name: name
        }
      })

      if (!item) {
        const count = await this.count()
        const sort_order = count + 1
        item = await this.create({
          name: name,
          status: status,
          sort_order: sort_order
        })

        await this.save(item)
        return { data: item, result: 1, resultMsg: '예약 상태 추가를 완료하였습니다.'}
      } else {
        return { data: item, result: 2, resultMsg: '이미 등록된 항목 입니다.'}
      }
    } catch (err) {
      this.logger.error(err)
      throw new Error('예약 상태 추가 실패하였습니다.')
    }
  }
}