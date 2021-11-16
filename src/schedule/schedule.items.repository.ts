import { MyLogger } from "src/config/mylogger";
import { EntityRepository, Repository } from "typeorm";
import { ScheduleItemResponseDto, ScheduleItemsResponseDto } from "./dto/response.schedule.item.dto";
import { ScheduleItem } from "./entities/schedule.items.entity";


/**
 * 예약 항목 Repository
 * @returns ScheduleItemsResponseDto
 */
@EntityRepository(ScheduleItem)
export class ScheduleItemsRepository extends Repository<ScheduleItem> {

  private readonly logger = new MyLogger(ScheduleItemsRepository.name)

  /**
   * 예약 항목 전체 리스트
   */
  async getItemList(): Promise<ScheduleItemsResponseDto> {
    let itemList: ScheduleItem[]

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
   * 예약 항목 추가
   * @param name 예약 항목 명칭
   * @param status 예약 항목 사용 여부
   * @returns ScheduleItemResponseDto
   */
  async createScheduleItem(name: string, status: number): Promise<ScheduleItemResponseDto> {
    let item: ScheduleItem

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