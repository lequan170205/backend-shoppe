import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);