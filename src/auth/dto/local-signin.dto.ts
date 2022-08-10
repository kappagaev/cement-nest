import { IsEmail, IsNotEmpty } from 'class-validator'

export default class LocalSigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
