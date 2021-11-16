import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { Customer } from "../entities/customer.entity";


/**
 * 고객 정보 응답 dto
 * @extends DefaultResponseDto
 * @data Customer
 */
export class CustomerResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '고객'
  })
  data?: Customer
}

/**
 * 고객 정보 리스트 응답 dto
 * @extends DefaultResponseDto
 * @data Customer[ ]
 */
 export class CustomersResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '고객',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(Customer)
    }
  })
  data?: Customer[]
}