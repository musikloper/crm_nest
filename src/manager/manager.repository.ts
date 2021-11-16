import { MyLogger } from "src/config/mylogger";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { ManagerResponseDto, ManagersResponseDto } from "./dto/response-manager.dto";
import { Manager } from "./entities/manager.entity";


@EntityRepository(Manager)
export class ManagerRepository extends Repository<Manager> {

  private readonly logger = new MyLogger(ManagerRepository.name)

  /**
   * 직원 등록
   * @param createManagerDto 
   * @returns CreateManagerDto
   */
  async registerManager(createManagerDto: CreateManagerDto): Promise<ManagerResponseDto> {
    let manager: Manager
    this.logger.log(createManagerDto)

    try {
      const insert = await getRepository(Manager)
      .createQueryBuilder()
      .insert()
      .into(Manager)
      .values(createManagerDto)
      .execute()

      const insertId = insert.raw.insertId

      manager = await getRepository(Manager)
      .createQueryBuilder('manager')
      .where('id = :id', { id: insertId })
      .getOne()

      return { data: manager, result: 1, resultMsg: '직원 등록 성공'}
    } catch (err) {
      this.logger.error(err)
      throw new Error('직원 등록 실패하였습니다.')
    }
  }

  /**
   * 직원 전체 리스트
   * @returns ManagersResponseDto
   */
  async getManagerList(): Promise<ManagersResponseDto> {

    try { 
      const data = await this.find()

      return { data: data, result: 1, resultMsg: '직원 전체 리스트' }
    } catch (err) {
      this.logger.error(err)
      throw new Error('직원 전체 리스트를 불러오지 못 했습니다.')
    }
  }

  /**
   * 직원 이름으로 검색
   * @param name 
   * @returns ManagersResponseDto
   */
  async getManagerByName(name: string): Promise<ManagersResponseDto> {
    try {
      const manager = await getRepository(Manager)
      .createQueryBuilder('manager')
      .where('name = :name', { name: name })
      .getMany()

      return { data: manager, result: 1, resultMsg: '직원 검색 완료' }
    } catch (err) {
      this.logger.error(err)
      throw new Error('직원 검색을 실패하였습니다.')
    }
  }
}