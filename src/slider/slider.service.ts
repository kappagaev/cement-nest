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
    return this.sliderModel.find()
  }

  findOne(id: string) {
    return this.sliderModel.findById(id)
  }

  update(id: string, updateSliderDto: UpdateSliderDto) {
    return this.sliderModel.findByIdAndUpdate(id, updateSliderDto)
  }

  remove(id: string) {
    return this.sliderModel.findByIdAndRemove(id)
  }
}
