import { Injectable, Logger } from '@nestjs/common';
import { trace } from 'console';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    const tmpError = new Error('test');
    this.logger.error(tmpError);
    
    return 'Hello World!';
  }
}
