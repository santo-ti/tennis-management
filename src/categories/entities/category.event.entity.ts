import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false, collection: 'events' })
export class CategoryEvent extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  operation: string;

  @Prop({ required: true })
  value: number;
}

export const CategoryEventSchema = SchemaFactory.createForClass(CategoryEvent);
