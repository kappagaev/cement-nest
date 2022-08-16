import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  first_name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password?: string
  @Prop()
  is_admin: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
