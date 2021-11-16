import { MyLogger } from "src/config/mylogger";
import { EntityRepository, Repository } from "typeorm";
import { CustomerJobResponseDto, CustomerJobsResponseDto } from "./dto/response.customer.job.dto";
import { CustomerJob } from "./entities/customer.job.entity";


@EntityRepository(CustomerJob)
export class CustomerJobRepository extends Repository<CustomerJob> {

  private readonly logger = new MyLogger(CustomerJobRepository.name)

  /**
   * 고객 직업 전체 리스트
   * @returns CustomerJobsReponseDto
   */
  async itemList(): Promise<CustomerJobsResponseDto> {
    let customerJobList: CustomerJob[]
    try {
      // sort_order 로 정렬
      customerJobList = await this.find({
        order: {
          sort_order: "ASC"
        },
      })
      this.logger.log(customerJobList)
      
      if (customerJobList.length !== 0) {
        return { data: customerJobList, result: 1, resultMsg: '고객 직업 전체 리스트'}
      } else {
        return { data: customerJobList, result: 2, resultMsg: '고객 직업 전체 리스트가 없습니다.'}
      }
    } catch (err) {
      this.logger.error(err)
      throw new Error(`고객 직업 전체 리스트를 가져오지 못 했습니다.`)
    }
    
  }


  /** 
   * 고객 직업 추가
   * @param {string} name 고객 직업 명칭
   * @param status 고객 직업 사용 여부
   * @returns item, result, resultMsg 
  */
  async createCustomerJobItem(name: string, status: number): Promise<CustomerJobResponseDto> {
    let item: CustomerJob

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
        return { data: item, result: 1, resultMsg: '고객 직업 추가를 완료하였습니다.'}
      } else {
        return { data: item, result: 2, resultMsg: '이미 등록된 항목 입니다.'}
      }

    } catch (err) {
      this.logger.error(err)
      throw new Error('고객 직업 추가를 실패하였습니다.')
    }
    
  }
}