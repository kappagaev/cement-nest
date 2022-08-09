import { Module } from '@nestjs/common'
import { SliderService } from './slider.service'
import { SliderController } from './slider.controller'
import { FileModule } from 'src/file/file.module'
import { MongooseModule } from '@nestjs/mongoose'
import { SliderSchema } from './entities/slider.entity'

@Module({
  controllers: [SliderController],
  providers: [SliderService],
  imports: [FileModule, MongooseModule.forFeature([{ name: 'Slider', schema: SliderSchema }])],
})
export class SliderModule {}
