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
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { SliderService } from './slider.service'
import { CreateSliderDto } from './dto/create-slider.dto'
import { UpdateSliderDto } from './dto/update-slider.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from 'src/file/file.service'

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService, private readonly fileService: FileService) {}

  @Post()
  async create(@Body() createSliderDto: CreateSliderDto) {
    const news = await this.sliderService.create(createSliderDto)

    return news
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('image'))
  async addImage(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new HttpException('No image', HttpStatus.BAD_REQUEST)
    }
    const imageName = await this.fileService.upload(image)
    const news = await this.sliderService.addImage(id, imageName)
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
    return this.sliderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSliderDto: UpdateSliderDto) {
    return this.sliderService.update(+id, updateSliderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sliderService.remove(+id)
  }
}
