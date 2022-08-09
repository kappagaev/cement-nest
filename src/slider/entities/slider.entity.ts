import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SliderDocument = Slider & Document

@Schema()
export class Slider {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  subtitle: string
  @Prop()
  link: string
  @Prop()
  image_filepath: string
}

export const SliderSchema = SchemaFactory.createForClass(Slider)
