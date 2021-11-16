import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerJobRepository } from './customer.job.repository';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { CustomerTypeRepository } from './customer.type.repository';
import { VisitPathRepository } from './visit.path.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerJobRepository,
      CustomerTypeRepository,
      VisitPathRepository,
      CustomerRepository,
    ],), 
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
