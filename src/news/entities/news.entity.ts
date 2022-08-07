import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NewsDocument = News & Document

@Schema()
export class News {
    @Prop()
    title: string

    @Prop()
    description: string


    @Prop()
    link: string

    @Prop()
    image_filepath: string
}

export const NewsSchema = SchemaFactory.createForClass(News)
