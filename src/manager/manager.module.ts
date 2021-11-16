import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerRepository } from './manager.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ManagerRepository,
    ])
  ],
  controllers: [ManagerController],
  providers: [ManagerService]
})
export class ManagerModule {}
