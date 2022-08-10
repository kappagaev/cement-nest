import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}
