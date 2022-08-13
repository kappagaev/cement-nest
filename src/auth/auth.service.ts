import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { compare, compareSync, hash } from 'bcrypt'
import { Model, ObjectId, Types } from 'mongoose'
import { UserDocument } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { RefreshTokenDocument } from './entities/refresh-token.entity'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel('RefreshToken') private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  private async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userService.findByEmail(email)
    if (!user || !compareSync(password, user.password)) {
      return null
    }
    return user
  }

  private createPayload(user: UserDocument) {
    return {
      id: user.id,
      first_name: user.first_name,
      email: user.email,
      is_admin: user.is_admin,
    }
  }

  private getTokens(payload: any) {
    const accessToken = this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '15m',
    })
    const refreshToken = this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    })
    return Promise.all([accessToken, refreshToken])
  }

  async signinLocal(email: string, password: string) {
    const user = await this.validateUser(email, password)
    if (!user) {
      return null
    }
    const payload = this.createPayload(user)
    const [accessToken, refreshToken] = await this.getTokens(payload)
    // saves refresh token to database
    this.saveRefreshToken(refreshToken, user.id)
    return { accessToken, refreshToken }
  }

  private async saveRefreshToken(refreshToken: string, user_id: string) {
    this.refreshTokenModel.create({ token: refreshToken, user_id: user_id })
  }

  async logout(user_id: string) {
    return await this.refreshTokenModel.deleteMany({ user_id: user_id }).exec()
  }

  async refresh(refreshToken: string, user_id: string) {
    const tokens = await this.refreshTokenModel.find({ user_id: user_id }).exec()
    let matchedToken: any = null
    for (const token of tokens) {
      if (token.token === refreshToken) {
        matchedToken = token
        break
      }
    }
    if (!matchedToken) {
      return null
    }
    this.refreshTokenModel.deleteOne({ _id: matchedToken._id }).exec()
    const payload = this.createPayload(await this.userService.findById(user_id))
    const [accessToken, newRefreshToken] = await this.getTokens(payload)

    this.saveRefreshToken(newRefreshToken, user_id)

    return { accessToken, newRefreshToken }
  }
}
