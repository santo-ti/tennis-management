import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CategoryEvent } from './category.event.entity';
import { Player } from 'src/players/entities/player.entity';

@Schema({ timestamps: true, collection: 'categories' })
export class Category extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: Types.ArraySubdocument<CategoryEvent>,
    ref: CategoryEvent.name,
  })
  events: CategoryEvent[];

  @Prop({ type: Types.ArraySubdocument<Player>, ref: Player.name })
  players: Array<Player | string>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
