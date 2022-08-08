import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { NewsService } from './news.service'
import { CreateNewsDto } from './dto/create-news.dto'
import { UpdateNewsDto } from './dto/update-news.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from 'src/file/file.service'

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService, private readonly fileService: FileService) {}

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto, @UploadedFile() image: Express.Multer.File) {
    const news = await this.newsService.create(createNewsDto)

    return news
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('image'))
  async addImage(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new HttpException('No image', HttpStatus.BAD_REQUEST)
    }
    const imageName = await this.fileService.upload(image)
    const news = await this.newsService.addImage(id, imageName)
    if (!news) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST)
    }
    return {
      message: 'Image added',
      imageName: imageName,
    }
  }

  @Get()
  findAll() {
    return this.newsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id)
  }
}
