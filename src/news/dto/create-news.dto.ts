import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateNewsDto {
  @ApiProperty({ example: 'test', description: 'Title of news' })
  @IsNotEmpty()
  title: string
  @ApiProperty({ example: 'test', description: 'Content of news' })
  @IsNotEmpty()
  description: string
  //   link: string
}
