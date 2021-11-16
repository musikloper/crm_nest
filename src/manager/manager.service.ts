import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerResponseDto, ManagersResponseDto } from './dto/response-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerRepository } from './manager.repository';

@Injectable()
export class ManagerService {

  constructor(
    @InjectRepository(ManagerRepository)
    private managerRespository: ManagerRepository
  ) {}

  async create(createManagerDto: CreateManagerDto): Promise<ManagerResponseDto> {
    return await this.managerRespository.registerManager(createManagerDto)
  }

  async findAll(): Promise<ManagersResponseDto> {
    return await this.managerRespository.getManagerList() 
  }

  async findOneByName(name: string): Promise<ManagersResponseDto> {
    return await this.managerRespository.getManagerByName(name);
  }

  update(id: number, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} manager`;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
