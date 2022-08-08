import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common'
import { NewsService } from './news.service'
import { CreateNewsDto } from './dto/create-news.dto'
import { UpdateNewsDto } from './dto/update-news.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { FileService } from 'src/file/file.service'

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService, private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createNewsDto: CreateNewsDto, @UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new Error('No image')
    }
    const imageName = await this.fileService.upload(image)
    return this.newsService.create(createNewsDto)
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
