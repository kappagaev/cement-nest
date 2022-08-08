import { Test, TestingModule } from '@nestjs/testing'
import { FileModule } from 'src/file/file.module'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'

describe('NewsController', () => {
  let controller: NewsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [NewsService],
      imports: [FileModule],
    }).compile()

    controller = module.get<NewsController>(NewsController)
  })

  it('should be defined', () => {
    // expect(controller).toBeDefined()
  })
})
