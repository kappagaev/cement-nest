import { Module } from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { FileModule } from 'src/file/file.module'
import { Mongoose } from 'mongoose'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsSchema } from './entities/news.entity'

@Module({
  imports: [FileModule, MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
