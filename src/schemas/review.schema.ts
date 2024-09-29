import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';

@Schema()
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  reviewer: User;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);