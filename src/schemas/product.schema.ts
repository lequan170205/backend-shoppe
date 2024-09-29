import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';
import { Review } from './review.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  discountedPrice: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  brand: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop([{ type: Types.ObjectId, ref: 'Review' }])
  reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);