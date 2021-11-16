import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { MyLogger } from './config/mylogger';

import * as fs from 'fs';

declare const module: any;

const logger = new Logger('INFO');
logger.log(`env: ${process.env.NODE_ENV}`);
logger.log(`port: ${process.env.PORT}`);

// https 설정
async function bootstrap() {
  // let httpsOptions = null;
  // if (fs.existsSync('/etc/letsencrypt/live/admin.mfast.co.kr/fullchain.pem')) {
  //   httpsOptions = {
  //     ca: fs.readFileSync(
  //       '/etc/letsencrypt/live/admin.mfast.co.kr/fullchain.pem',
  //       'utf8',
  //     ),
  //     cert: fs.readFileSync(
  //       '/etc/letsencrypt/live/admin.mfast.co.kr/cert.pem',
  //       'utf8',
  //     ),
  //     key: fs.readFileSync(
  //       '/etc/letsencrypt/live/admin.mfast.co.kr/privkey.pem',
  //       'utf8',
  //     ),
  //   };
  // }
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
    logger: new MyLogger(),
  });
  app.setGlobalPrefix('api') 

  const PORT = Number(process.env.PORT) + Number(process.env.INSTANCE_ID);

  // 글로벌 파이프
  app.useGlobalPipes(
    // 컨트롤러에 들어오는 데이터 유효성 검사
    new ValidationPipe()
  )

  // 글로벌권한 가드
  // app.useGlobalGuards(new RolesGuard());

  // swagger 비밀번호 설정
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  // swagger 설정  api 공부해서 나중에 추가하기
  const config = new DocumentBuilder()
    .setTitle('CRM application API')
    .setDescription('CRM 어플리케이션 API 문서 입니다.')
    .setVersion('1.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  logger.log(`listening on port ${PORT}`);

  // hot reload 설정 추후 삭제
  if (module.hot) {
    // nest hot reload 설정
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
