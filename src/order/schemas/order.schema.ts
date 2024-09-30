import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  products: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({
    required: true,
    enum: [
      'pending',
      'processing',
      'shipped',
      'delivered',
      'completed',
      'cancelled',
      'returned',
    ],
    default: 'pending',
  })
  status: string;

  @Prop({ required: true, enum: ['paid', 'unpaid'], default: 'unpaid' })
  paymentStatus: string;

  @Prop({
    type: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    required: true,
  })
  shippingAddress: {
    addressLine: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
