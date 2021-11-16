import { LoggerService } from '@nestjs/common';
import * as moment from 'moment-timezone'

export class MyLogger implements LoggerService {
    private context = 'INFO';
    constructor(context: string = 'INFO'){
        this.context = context;
    }

    log(message: any, context: string = this.context) {
        console.log(process.env.INSTANCE_ID, moment().format('MM-DD HH:mm:ss.SSS'), `[\x1b[36m${context}]`,'\x1b[0m', message);
    }
    error(message: string, trace: string = '', context: string = this.context) {
        console.error(process.env.INSTANCE_ID, moment().format('MM-DD HH:mm:ss.SSS'), `[${context}] [Error]`, message, trace);
    }
    warn(message: string, context: string = this.context) {
        console.log(process.env.INSTANCE_ID, moment().format('MM-DD HH:mm:ss.SSS'), `[${context}] [Warnning]`, message);
    }
    debug(message: string, context: string = this.context) {
        if(process.env.NODE_ENV != 'production'){
            console.log(process.env.INSTANCE_ID, moment().format('MM-DD HH:mm:ss.SSS'), `[${context}] [Debug]`, message);
        }
    }
}