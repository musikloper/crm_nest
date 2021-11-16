import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateScheduleItemDto {

  @ApiProperty({
    description: '',
    example: ''
  })
  @IsString()
  type: string

  @ApiProperty({
    description: '',
    example: ''
  })
  @IsString()
  name: string

  @ApiProperty({
    description: '',
    example: ''
  })
  @IsNumber()
  status: number
}