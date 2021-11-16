import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { ScheduleStatus } from "../entities/schedule.status.entity";


/**
 * 예약 구분 응답 dto
 * @extends DefaultResponseDto
 * @data schedulesection
 */
export class ScheduleStatusResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '예약 구분 정보'
  })
  data?: ScheduleStatus
}

/**
 * 예약 구분 리스트 응답 dto
 * @extends DefaultResponseDto
 * @data schedulesection
 */
export class ScheduleStatusListResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '예약 구분 정보',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(ScheduleStatus)
    }
  })
  data?: ScheduleStatus[]
}