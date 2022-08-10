import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type RefreshTokenDocument = RefreshToken & Document
@Schema()
export default class RefreshToken {
  @Prop()
  token: string
  @Prop()
  user_id: string
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)
