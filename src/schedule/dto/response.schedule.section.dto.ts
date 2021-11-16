import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { ScheduleSection } from "../entities/schedule.sections.entity";


/**
 * 예약 구분 응답 dto
 * @extends DefaultResponseDto
 * @data schedulesection
 */
export class ScheduleSectionResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '예약 구분 정보'
  })
  data?: ScheduleSection
}

/**
 * 예약 구분 리스트 응답 dto
 * @extends DefaultResponseDto
 * @data schedulesection
 */
export class ScheduleSectionsResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '예약 구분 정보',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(ScheduleSection)
    }
  })
  data?: ScheduleSection[]
}