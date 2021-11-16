import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/Roles.guard';
// import { EventModule } from './event/event.module';
import { CustomerModule } from './customer/customer.module';
import { BasicModule } from './basic/basic.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ReceiveModule } from './receive/receive.module';
import { CounselingModule } from './counseling/counseling.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { MyLogger } from './config/mylogger';
import { ManagerModule } from './manager/manager.module';
// import { ReceiveModule } from './receive/receive.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'vue'),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // to get access to it in every component
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        // synchronize: true,
        // loggin True : 로그에 sql 쿼리 보여줌
        logging: true,
        migrationsRun: true,
        cli: { "migrationsDir": "src/migrations" },
        // autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
    // // EventModule,
    CustomerModule,
    BasicModule,
    ScheduleModule,
    ReceiveModule,
    CounselingModule,
    ManagerModule,
  ],
  controllers: [
    // AppController,
    // CustomerController,
  ],
  providers: [
    // AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // CustomerService,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
