import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AccessTokenStrategy } from './strategies/access-token.strategy'
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { RefreshTokenSchema } from './entities/refresh-token.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: 'RefreshToken', schema: RefreshTokenSchema }]),
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
