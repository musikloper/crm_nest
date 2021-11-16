import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { ScheduleItem } from "../entities/schedule.items.entity";


/**
 * 예약 항목 응답 dto
 * @extends DefaultResponseDto
 * @data ScheduleItem
 */
export class ScheduleItemResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '예약 항목 정보'
  })
  data?: ScheduleItem
}

/**
 * 예약 항목 리스트 응답 dto
 * @extends DefaultResponseDto
 * @data ScheduleItem[ ]
 */
export class ScheduleItemsResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '예약 항목 정보',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(ScheduleItem)
    }
  })
  data?: ScheduleItem[]
}