lever-t nest 베이스 프로젝트

ormconfig.json typeorm 마이그레이션 설정 파일
ecosystem.config.js pm2 배포 설정 파일

/config/
설정 파일 폴더
configuration.ts 데이터 베이스 연결설정 파일
default.res.dto.ts response default파일 모든 response DTO는 이 파일을 상속받아 만든다.
mylogger.ts 로깅 파일

/common/
모듈 공통함수나 미들웨어 인터셉터를 넣는 곳

/user/
기본 유저 모듈

/auth/
기본 jwt 인증 모듈
