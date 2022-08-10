import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { AuthService } from './auth.service'
import LocalSigninDto from './dto/local-signin.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signin')
  async signinLocal(@Body() { email, password }: LocalSigninDto) {
    const tokens = await this.authService.signinLocal(email, password)
    return tokens
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  async logout(@Req() req: Request) {
    const user_id: any = req.user['id']
    console.log(req.user)
    const result = await this.authService.logout(user_id)
    if (result == null) {
      throw new HttpException('Logout failed', HttpStatus.BAD_REQUEST)
    }

    return {
      message: 'Logout success',
    }
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  async refresh(@Req() req: Request) {
    const refreshToken: any = req.user['refreshToken']
    const user_id: any = req.user['id']
    const tokens = await this.authService.refresh(refreshToken, user_id)
    if (tokens == null) {
      return new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED)
    }
    return tokens
  }
}
