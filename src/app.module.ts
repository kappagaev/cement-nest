import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { NewsModule } from './news/news.module'
import { FileModule } from './file/file.module'
import { MulterModule } from '@nestjs/platform-express'
import { SliderModule } from './slider/slider.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cement', {
      autoIndex: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    MulterModule.register({ dest: './uploads' }),
    UserModule,
    NewsModule,
    FileModule,
    SliderModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
