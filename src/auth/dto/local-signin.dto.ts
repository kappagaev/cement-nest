import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export default class LocalSigninDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@test.com', description: 'Email of existing user' })
  email: string

  @IsNotEmpty()
  @ApiProperty({ example: 'test', description: 'Password of existing user' })
  password: string
}
