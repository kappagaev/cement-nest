import { Module } from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { FileModule } from 'src/file/file.module'

@Module({
  imports: [FileModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
