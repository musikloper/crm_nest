import { PartialType } from '@nestjs/swagger';
import { CreateReceiveDto } from './create-receive.dto';

export class UpdateReceiveDto extends PartialType(CreateReceiveDto) {}
