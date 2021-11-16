import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { VisitPath } from "../entities/visit.path.entity";


/**
 * 유입 경로 응답 dto
 * @extends DefaultResponseDto
 * @data Visitpath
 */
export class VisitPathResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '유입 경로 정보'
  })
  data?: VisitPath
}

/**
 * 유입 경로 리스트 응답 dto
 * @extends DefaultResponseDto
 * @data Visitpath[ ]
 */
export class VisitPathsResponseDto extends DefaultResponseDto {

  @ApiProperty({
    description: '유입 경로 정보',
    type: 'array',
    isArray: true,
    items: {
      $ref: getSchemaPath(VisitPath)
    }
  })
  data?: VisitPath[]
}