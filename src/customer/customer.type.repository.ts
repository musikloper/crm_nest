import { MyLogger } from "src/config/mylogger";
import { EntityRepository, Repository } from "typeorm";
import { CustomerTypeReponseDto, CustomerTypesReponseDto } from "./dto/response.customer.type.dto";
import { CustomerType } from "./entities/customer.type.entity";


@EntityRepository(CustomerType)
export class CustomerTypeRepository extends Repository<CustomerType> {

  private readonly logger = new MyLogger(CustomerTypeRepository.name)
  
  /**
   * 고객 분류 전체 리스트
   * @returns CustomerTypesReponseDto
   */
  async itemList(): Promise<CustomerTypesReponseDto> {
    let customerTypeList: CustomerType[]
    try {
      // sort_order 로 정렬
      customerTypeList = await this.find({
        order: {
          sort_order: "ASC"
        }
      })
      this.logger.log(customerTypeList)
      
      if (customerTypeList.length !== 0) {
        return { data: customerTypeList, result: 1, resultMsg: '고객 분류 전체 리스트'}
      } else {
        return { data: customerTypeList, result: 2, resultMsg: '고객 분류 전체 리스트가 없습니다.'}
      }
    } catch (err) {
      this.logger.error(err)
      throw new Error(`고객 분류 전체 리스트를 가져오지 못 했습니다.`)
    }
  }

  /** 
   * 고객 분류 추가
   * @param name 고객 분류 명칭
   * @param status 고객 분류 사용 여부 
   * @returns CustomerTypeReponseDto
  */
     async createSettingItem(name: string, status: number): Promise<CustomerTypeReponseDto> {
      let item: CustomerType

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

          return { data: item, result: 1, resultMsg: '고객 분류 추가를 완료하였습니다.'}
        } else {
          return { data: item, result: 2, resultMsg: '이미 등록된 항목 입니다.'}
        }

      } catch (err) {
        this.logger.error(err)
        throw new Error('고객 분류 추가를 실패하였습니다.')
      }
    }
}