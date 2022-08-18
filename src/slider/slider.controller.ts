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
  UseGuards,
} from '@nestjs/common'
import { SliderService } from './slider.service'
import { CreateSliderDto } from './dto/create-slider.dto'
import { UpdateSliderDto } from './dto/update-slider.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from 'src/file/file.service'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('slider')
@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService, private readonly fileService: FileService) {}
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createSliderDto: CreateSliderDto) {
    const news = await this.sliderService.create(createSliderDto)

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
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return (await this.sliderService.findAll()).reverse()
  }

  @Get(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(id)
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateSliderDto: UpdateSliderDto) {
    return this.sliderService.update(id, updateSliderDto)
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.sliderService.remove(id)
  }
}
