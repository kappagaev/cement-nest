import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateNewsDto } from './dto/create-news.dto'
import { UpdateNewsDto } from './dto/update-news.dto'
import { News, NewsDocument } from './entities/news.entity'

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}
  async create(createNewsDto: CreateNewsDto): Promise<NewsDocument> {
    const news = new this.newsModel(createNewsDto)
    return await news.save()
  }

  async addImage(id: string, imageName: string) {
    const news = await this.newsModel.findByIdAndUpdate(id, {
      image_filepath: imageName,
    })
    if (!news) {
      return null
    }
    return await news.save()
  }

  async findAll() {
    return (await this.newsModel.find()).reverse()
  }

  findOne(id: string) {
    return this.newsModel.findById(id)
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return this.newsModel.findByIdAndUpdate(id, updateNewsDto)
  }

  remove(id: string) {
    return this.newsModel.findByIdAndDelete(id)
  }
}
