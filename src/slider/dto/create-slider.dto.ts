import { IsNotEmpty } from 'class-validator'

export class CreateSliderDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  subtitle: string
  link: string
}
