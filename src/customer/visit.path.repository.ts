import { MyLogger } from "src/config/mylogger";
import { EntityRepository, Repository } from "typeorm";
import { VisitPathResponseDto, VisitPathsResponseDto } from "./dto/response.visit.path.dto";
import { VisitPath } from "./entities/visit.path.entity";



@EntityRepository(VisitPath)
export class VisitPathRepository extends Repository<VisitPath> {

  private readonly logger = new MyLogger(VisitPathRepository.name)
  
  /**
   * 유입 경로 전체 리스트
   * @returns VisitPathsResponseDto
   */
  async itemList(): Promise<VisitPathsResponseDto> {
    let visitPathList: VisitPath[]

    try {
      visitPathList = await this.find({
        order: {
          sort_order: "ASC"
        }
      })
      this.logger.log(visitPathList)
    
      if (visitPathList.length !== 0) {
        return { data: visitPathList, result: 1, resultMsg: '유입 경로 전체 리스트'}
      } else {
        return { data: visitPathList, result: 2, resultMsg: '유입 경로 전체 리스트가 없습니다.'}
      }

    } catch (err) {
      this.logger.error(err)
      throw new Error(`유입 경로 전체 리스트를 가져오지 못 했습니다.`)
    }
  }


  /** 
   * 유입 경로 추가
   * @param name 유입 경로 명칭
   * @param status 유입 경로 사용 여부
   * @param category 유입 경로 카테고리
   * @returns VisitPathResponseDto
  */
    async createSettingItem(name: string, status: number,): Promise<VisitPathResponseDto>  {
      let item: VisitPath
      
      try {
        item = await this.findOne({
          where: {
            name: name
          }
        })

        if (!item) {
          const count = await this.count()
          const sort_order = count + 1

          // if (category === 0) {
          item = await this.create({
            name: name,
            status: status,
            sort_order: sort_order,
          })
          // } else {
          //   item = await this.create({
          //     name: name,
          //     status: status,
          //     sort_order: sort_order,
          //     category: category
          //   })
          // }
          this.logger.log('------- visit path -------')
          this.logger.log(item)
          await this.save(item)
          return { data: item, result: 1, resultMsg: '유입 경로 추가를 완료하였습니다.'}
        } else {
          return { data: item, result: 2, resultMsg: ''}
        }

      } catch (err) {
        this.logger.error(err)
        throw new Error('유입 경로 추가를 실패하였습니다.')
      }
      
    }




}