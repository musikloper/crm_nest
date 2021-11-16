import { Body, Controller, Get, Logger, Param, Post, Query, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyLogger } from 'src/config/mylogger';
import { CustomerService } from './customer.service';
import { CustomerSettingCreateDto } from './dto/create.customer.setting.dto';
import { FindCustomerDto } from './dto/find.customer.dto';
import { RegisterCustomerDto } from './dto/register.customer.dto';
import { CustomersResponseDto } from './dto/reponse.customer.dto';

@ApiTags('Customer')
@Controller('/customer')
export class CustomerController {
  
  private readonly logger = new MyLogger(CustomerController.name);

  constructor(
    private readonly customerService: CustomerService
  ) {}



  @ApiOperation({ summary: '고객 설정 리스트'})
  @ApiCreatedResponse({ description: '고객 설정 전체 리스트 출력'})
  @Get('/customerSettingList')
  async customerSettingList(@Query('type') type: string): Promise<Object> {
    this.logger.log(`Query('type') : ${type}`)
    const returndata = await this.customerService.customerSettingList(type)
    return returndata
  }

  @ApiOperation({ summary: '고객 설정 추가' })
  @ApiCreatedResponse({ description: '고객 설정 추가'})
  @Post('/customerSetting')
  async insertCustomerSetting(@Body() data: CustomerSettingCreateDto): Promise<Object> {
    this.logger.log('CustomerSettingCreateDto')
    this.logger.log(data)
    return await this.customerService.createSettingItem(data)
  }


  @ApiOperation({ summary: '고객 번호 생성' })
  @ApiCreatedResponse({ description: '고객 번호 조회후 생성'})
  @Get('/customerNumber')
  async getCustomerNumber(): Promise<string> {
    const data = await this.customerService.getCustomerNumber()
    this.logger.log(data)
    return data
  }

  @ApiOperation({ summary: '고객 등록' })
  @ApiCreatedResponse({ description: '신규 고객 등록'})
  @Post('/register')
  async registerCustomer(@Body() data: RegisterCustomerDto): Promise<Object> {
    this.logger.log('registerCustomer')
    this.logger.log(data)
    return await this.customerService.registerCustomer(data)
  }

  @ApiOperation({ summary: '고객 전체 리스트'})
  @ApiCreatedResponse({ description: '고객 전체 리스트를 불러온다' })
  @Get('/customerList')
  async getCustomerList(): Promise<Object> {
    this.logger.log('getCustomerList')
    return await this.customerService.getCustomerList()
  }

  @Get('/customerListByData')
  async getCustomerByData(@Query() data: FindCustomerDto): Promise<CustomersResponseDto> {
    this.logger.log('customerListByData')
    const user = await this.customerService.getCustomerByData(data)
    this.logger.log(user)
    return user
  }

}
