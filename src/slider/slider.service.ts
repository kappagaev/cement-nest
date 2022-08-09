import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateSliderDto } from './dto/create-slider.dto'
import { UpdateSliderDto } from './dto/update-slider.dto'
import { Slider, SliderDocument } from './entities/slider.entity'

@Injectable()
export class SliderService {
  constructor(@InjectModel(Slider.name) private sliderModel: Model<SliderDocument>) {}

  create(createSliderDto: CreateSliderDto) {
    return this.sliderModel.create(createSliderDto)
  }

  addImage(id: string, imageName: string) {
    return this.sliderModel.findByIdAndUpdate(id, {
      image_filepath: imageName,
    })
  }

  findAll() {
    return `This action returns all slider`
  }

  findOne(id: number) {
    return `This action returns a #${id} slider`
  }

  update(id: number, updateSliderDto: UpdateSliderDto) {
    return `This action updates a #${id} slider`
  }

  remove(id: number) {
    return `This action removes a #${id} slider`
  }
}
