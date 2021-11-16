import { MyLogger } from "src/config/mylogger";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { CustomerResponseDto, CustomersResponseDto } from "./dto/reponse.customer.dto";
import { RegisterCustomerDto } from "./dto/register.customer.dto";
import { Customer } from "./entities/customer.entity";
import { FindCustomerDto } from "./dto/find.customer.dto";


@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

  private readonly logger = new MyLogger(CustomerRepository.name)

  /**
   * 고객 번호 조회 후 생성
   * @example '20210101-001'
   * @return {string} customer_number
   */
  async getCustomerNumber(): Promise<string> {
    const moment = require('moment');
    let now = moment().format('yyyyMMDD');

    const count = await getRepository(Customer)
    .createQueryBuilder('customer')
    .where("Date(created_date) = :now ", { now: now })
    .getCount()
    // this.logger.log(count)
    let number = String(count + 1)

    if (count < 1000) {
      number = number.padStart(3,'0')
      const customerNumber = `${now}-${number}`
      return customerNumber
    } else {
      const customerNumber = `${now}-${number}`
      return customerNumber
    }
  }

  /**
   * 고객 등록
   * @param registerCustomerDto 
   * @returns CustomerResponseDto
   */
  async registerCustomer(registerCustomerDto: RegisterCustomerDto): Promise<CustomerResponseDto> {
    let customer: Customer
    this.logger.log(registerCustomerDto)
    const { customer_name, 
            unique_number, 
            rrn_prefix,
            rrn_suffix,
            birth_date,
            luna_calendar,
            email,
            zipcode,
            road_address,
            old_address,
            address_detail,
            customer_memo,
            receive_event_sms,
            receive_schedule_sms,
            gender,
            foreigner,
            customer_status,
            customer_type,
            customer_job_id,
            visit_path_id,
            manager_id,
            introduce_customer_id } = registerCustomerDto
    try {
      customer = await this.findOne({ 
        where: {
          unique_number: registerCustomerDto.unique_number
        }
      })

      if (!customer) {
        const insert = await this
        .createQueryBuilder()
        .insert()
        .into(Customer)
        .values({
          unique_number: unique_number,
          customer_name: customer_name,
          rrn_prefix: rrn_prefix,
          rrn_suffix: rrn_suffix,
          birth_date: birth_date,
          luna_calendar: luna_calendar,
          email: email,
          zipcode: zipcode,
          road_address: road_address,
          old_address: old_address,
          address_detail: address_detail,
          customer_memo: customer_memo,
          receive_event_sms: receive_event_sms,
          receive_schedule_sms: receive_schedule_sms,
          gender: gender,
          foreigner: foreigner,
          customer_status: customer_status,
          customerType: customer_type,
          customerJob: customer_job_id,
          visitPath: visit_path_id,
          manager: manager_id,
          introduce_customer_id: introduce_customer_id,

        })
        .execute()
        this.logger.log(insert)
        const insertId = insert.raw.insertId
        this.logger.log(insert.raw.insertId)
        customer = await getRepository(Customer)
        .createQueryBuilder('customer')
        .where("customer_id = :id", { id: insertId })
        .leftJoinAndSelect("customer.customerJob", "customerJob")
        .getOne()
        this.logger.log(customer)

        return { data: customer, result: 1, resultMsg: '고객 등록 완료하였습니다.'}
      } else {
        return { data: customer, result: 2, resultMsg: '이미 등록된 고객입니다.'}
      }
    } catch (err) {
      this.logger.error(err)
      throw new Error('고객 등록 실패하였습니다.')
    }
  }



  /**
   * 고객 전체 리스트
   */
  async getCustomerList(): Promise<CustomersResponseDto> {
    try {

      const data = await getRepository(Customer)
        .createQueryBuilder('customer')
        .leftJoinAndSelect('customer.customerType', 'customerType')
        .leftJoinAndSelect('customer.customerJob', 'customerJob')
        .leftJoinAndSelect('customer.visitPath', 'visitPath')
        .leftJoinAndSelect('customer.manager', 'manager')
        .leftJoinAndSelect('customer.introduce_customer_id', 'introduce_customer')
        .orderBy('customer.customer_id', 'DESC')
        .getMany()
      this.logger.log(data)
      return { data: data, result: 1, resultMsg: '고객 전체 리스트'}

    } catch (err) {
      this.logger.error(err)
      throw new Error('고객 전체 리스트를 불러오지 못 했습니다.')
    }
  }

  /**
   * 고객 번호로 검색
   * @param findCustomerDto 
   * @returns CustomerResponseDto
   */
  async getCustomerByData(findCustomerDto: FindCustomerDto): Promise<CustomersResponseDto> {
    try { 
      const data = await this.find({
        where: [
          {unique_number: findCustomerDto.unique_number},
          {customer_name: findCustomerDto.customer_name},
          {rrn_prefix: findCustomerDto.rrn_prefix},
          {birth_date: findCustomerDto.birth_date},
          {email: findCustomerDto.email}
        ]
      })

      if (!data) {
        return { data: data, result: 2, resultMsg: '찾는 고객이 없습니다.'}
      } else {
        return { data: data, result: 1, resultMsg: '완료'}
      }
    } catch (err) {
      this.logger.error(err)
      throw new Error('고객 검색을 실패하였습니다.')
    }
  }

}