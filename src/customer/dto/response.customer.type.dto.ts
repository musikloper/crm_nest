import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { CustomerType } from "../entities/customer.type.entity";


/**
 * 고객 분류 응답 dto
 * @extends DefaultResponseDto
 * @data CustomerType
 */
export class CustomerTypeReponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '고객 설정 정보',
  })
  data?: CustomerType

}

/**
 * 고객 분류 리스트 응답 dto
 * @extends DefaultResponseDto
 * @data CustomerType[ ]
 */
export class CustomerTypesReponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '고객 설정 정보',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(CustomerType)
    }
  })
  data?: CustomerType[]

}