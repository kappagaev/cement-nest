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
  UseGuards,
} from '@nestjs/common'
import { NewsService } from './news.service'
import { CreateNewsDto } from './dto/create-news.dto'
import { UpdateNewsDto } from './dto/update-news.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from 'src/file/file.service'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService, private readonly fileService: FileService) {}

  @Post()
  @ApiBody({ type: CreateNewsDto })
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createNewsDto: CreateNewsDto, @UploadedFile() image: Express.Multer.File) {
    const news = await this.newsService.create(createNewsDto)

    return news
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
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
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.newsService.findAll()
  }

  @Get(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id)
  }

  @Patch(':id')
  @ApiBody({ type: UpdateNewsDto })
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto)
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.newsService.remove(id)
  }
}
