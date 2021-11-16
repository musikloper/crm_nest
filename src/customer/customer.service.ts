import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLogger } from 'src/config/mylogger';
import { CustomerJobRepository } from './customer.job.repository';
import { CustomerRepository } from './customer.repository';
import { CustomerTypeRepository } from './customer.type.repository';
import { CustomerResponseDto, CustomersResponseDto } from './dto/reponse.customer.dto';
import { CustomerSettingCreateDto } from './dto/create.customer.setting.dto';
import { RegisterCustomerDto } from './dto/register.customer.dto';
import { CustomerJob } from './entities/customer.job.entity';
import { VisitPathRepository } from './visit.path.repository';
import { FindCustomerDto } from './dto/find.customer.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new MyLogger(CustomerService.name);
  
  constructor(
    @InjectRepository(CustomerJobRepository) 
    private customerJobRepository: CustomerJobRepository,

    @InjectRepository(CustomerTypeRepository) 
    private customerTypeRepository: CustomerTypeRepository,
    private visitPathRepository: VisitPathRepository,
    private customerRepository: CustomerRepository,
  ){}

  /**
   * 고객 관련 설정 전체 리스트
   * @param {string} type - 고객 직업 설정 or 고객 분류 설정 or 유입 경로 설정
   * @example '고객 직업 설정'
   * @returns {Object} responseDto
   */
  async customerSettingList(type: string): Promise<Object> {
    
    if (type === '고객 직업') {
      return await this.customerJobRepository.itemList()
    } else if (type === '고객 분류') {
      return await this.customerTypeRepository.itemList()
    } else if (type === '유입 경로') {
      return await this.visitPathRepository.itemList()
    }
  }


  /**
   * 고객 직업, 고객분류 추가
   * @param {CustomerSettingCreateDto} customerSettingCreateDto
   * @example '고객 직업, 고객분류'
   * @returns {Object} responseDto
   */
  async createSettingItem(customerSettingCreateDto: CustomerSettingCreateDto): Promise<Object> {
    const { type, name, status, category } = customerSettingCreateDto
    if (type === '고객 직업') {
      return this.customerJobRepository.createCustomerJobItem(name, status)
    } else if (type === '고객 분류') {
      return this.customerTypeRepository.createSettingItem(name, status)
    } else if (type === '유입 경로') {
      return this.visitPathRepository.createSettingItem(name, status)
    }
  }

  /**
   * 고객 번호 조회 후 생성
   * @example '20210101-001'
   * @return customer_number
   */
  async getCustomerNumber(): Promise<string> {
    return await this.customerRepository.getCustomerNumber()
  }

  /**
   * 고객 등록
   * @param registerCustomerDto 
   * @returns CustomerResponseDto
   */
  async registerCustomer(registerCustomerDto: RegisterCustomerDto): Promise<CustomerResponseDto> {
    return await this.customerRepository.registerCustomer(registerCustomerDto)
  }

  /**
   * 고객 전체 리스트
   * @returns CustomersResponseDto
   */
  async getCustomerList(): Promise<Object> {
    return await this.customerRepository.getCustomerList()
  }

  async getCustomerByData(findCustomerDto: FindCustomerDto): Promise<CustomersResponseDto> {
    this.logger.log(findCustomerDto)
    return await this.customerRepository.getCustomerByData(findCustomerDto)
  }


  selectRepository(type: string) {
    if (type === '고객 직업 설정') {
      return this.customerJobRepository
    } else if (type === '고객 분류 설정') {
      return this.customerTypeRepository
    } else if (type === '유입 경로 설정') {
      return this.visitPathRepository
    }
  }








}
