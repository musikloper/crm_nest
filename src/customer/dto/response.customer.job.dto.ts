import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { CustomerJob } from "../entities/customer.job.entity";


/**
 * 고객 직업 응답 dto
 * @extends DefaultResponseDto
 * @data Customerjob
 */
export class CustomerJobResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '고객 설정 정보',
  })
  data?: CustomerJob

}

/**
 * 고객 직업 리스트 응답 dto
 * @extends DefaultResponseDto
 * @data Customerjob[ ]
 */
export class CustomerJobsResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '고객 설정 정보',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(CustomerJob)
    }
  })
  data?: CustomerJob[]

}