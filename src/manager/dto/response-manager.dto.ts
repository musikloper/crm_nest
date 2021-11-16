import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { Manager } from "../entities/manager.entity";


/**
 * 직원 정보 응답 dto
 * @extends DefaultResponseDto
 * @data Manager
 */
export class ManagerResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: '직원'
  })
  data?: Manager
}

/**
 * 고객 정보 리스트 응답 dto
 * @extends DefaultResponseDto
 * @data Manager[ ]
 */
 export class ManagersResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '고객',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(Manager)
    }
  })
  data?: Manager[]
}