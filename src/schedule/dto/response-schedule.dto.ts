import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { Schedule } from "../entities/schedule.entity";

export class ScheduleResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '예약 정보'
  })
  data?: Schedule
  
  
}

export class SchedulesResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '예약 항목 정보',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(Schedule)
    }
  })
  data?: Schedule[]
}