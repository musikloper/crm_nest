import { MyLogger } from "src/config/mylogger";
import { EntityRepository, Repository } from "typeorm";
import { ScheduleSectionResponseDto, ScheduleSectionsResponseDto } from "./dto/response.schedule.section.dto";
import { ScheduleSection } from "./entities/schedule.sections.entity";


/**
 * 예약 구분 Repository
 */
@EntityRepository(ScheduleSection)
export class ScheduleSectionRepository extends Repository<ScheduleSection> {

  private readonly logger = new MyLogger(ScheduleSectionRepository.name)

  /**
   * 예약 구분 전체 리스트
   * @returns ScheduleSectionsResponseDto
   */
  async getItemList(): Promise<ScheduleSectionsResponseDto> {
    let itemList: ScheduleSection[]

    try {
      itemList = await this.find({
        order: {
          sort_order: "ASC"
        },
      })
      this.logger.log(itemList)

      if (itemList.length !== 0) {
        return { data: itemList, result: 1, resultMsg: '예약 항목 전체 리스트'}
      } else {
        return { data: itemList, result: 2, resultMsg: '예약 항목 전체 리스트가 없습니다.'}
      }

    } catch (err) {
      this.logger.error(err)
      throw new Error('예약 항목 전체 리스트를 가져오지 못 했습니다.')
    }
  }

  /**
   * 예약 구분 추가
   * @params name 예약 구분 명칭
   * @params status 예약 구분 사용 여부
   * @returns ScheduleSectionResponseDto
   */
   async createScheduleItem(name: string, status: number): Promise<ScheduleSectionResponseDto> {
    let item: ScheduleSection

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
        return { data: item, result: 1, resultMsg: '예약 항목 추가를 완료하였습니다.'}
      } else {
        return { data: item, result: 2, resultMsg: '이미 등록된 항목 입니다.'}
      }
    } catch (err) {
      this.logger.error(err)
      throw new Error('예약 항목 추가 실패하였습니다.')
    }
  }

}